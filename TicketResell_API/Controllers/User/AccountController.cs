
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace TicketResell_API.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;

        public AccountController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, IEmailSender emailSender)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _emailSender = emailSender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            //new object of class IdentityUser
            var user = new IdentityUser 
            {
                UserName = model.email,
                Email = model.email,
            };
            //CreateAsync method from _userManager(UserManager<IdentityUser>)
            var result = await _userManager.CreateAsync(user, model.password);
            //Check if user creation was successful
            {
                if (result.Succeeded)
                {
                    //Find user after successful creation
                    var _user = await _userManager.FindByEmailAsync(model.email!);
                    //Generate email confirmation code
                    var emailCode = await _userManager.GenerateEmailConfirmationTokenAsync(_user!);
                    //Send confirmation email
                    string sendEmailResult = await _emailSender.SendConfirmationEmailAsync(_user.Email, emailCode);
                    //create notification to let user know that registration is successful
                    return Ok(new { message = "User registered successfully", sendEmailResult });
                }         
            }
            //Returns error if account creation fails
            return BadRequest(result.Errors);
        }

        [HttpPost("confirmation-email")]
        public async Task<IActionResult> Confirmation([FromBody] EmailConfirmation model)
        {
            //check the email not null and code not <=0
            if (string.IsNullOrEmpty(model.email) || model.code <= 0)
            {
                return BadRequest("Invalid code provided");
            }
            //find by email
            var user = await _userManager.FindByNameAsync(model.email);
            if (user == null)
            {
                return BadRequest("Invalid indentity provided");
            }
            //Email confirmation
            var result = await _userManager.ConfirmEmailAsync(user, model.code.ToString());
            if (!result.Succeeded)
            {
                return BadRequest("Invalid code provided");
            }
            else
            {
                return Ok("Email confirmed successfully, you can proceed to login");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            //check the email or password
            if(string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.password))
            {
                return BadRequest();
            }
            //Use _userManager to find users by email address
            var user = await _userManager.FindByEmailAsync(model.email);
            bool isEmailConfirmed = await _userManager.IsEmailConfirmedAsync(user!);
            //check the cofirmation of email before login
            if (!isEmailConfirmed) 
            {
                return BadRequest("You need to cofirm email before loggin in");
            }
            //Check if the user exists and if so, validate the password using the CheckPasswordAsync method
            if (user != null && await _userManager.CheckPasswordAsync(user, model.password))
            {
                //If authentication is successful, get a list of roles the user belongs to
                var userRole = await _userManager.GetRolesAsync(user);
                //Create a list of claims (information about the user stored in the token) that will be included in the token
                var authClaims = new List<Claim>
                {
                    //Add claim sub which is user email address.
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                    //Add jti claim (JWT ID), create a unique identifier for the token using Guid.NewGuid()
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                //Add claims for user roles to the authClaims list
                authClaims.AddRange(userRole.Select(role => new Claim(ClaimTypes.Role, role)));
                //Create a JWT token object
                var token = new JwtSecurityToken(
                    //Identify the token issuer
                    issuer: _config["Jwt:Issuer"],
                    //Set token expiration time
                    expires: DateTime.Now.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"]!)),
                    //Put the generated claims into the token
                    claims: authClaims,
                    //Set up the signature information for the token
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)),
                    //Use SHA-256 HMAC algorithm to protect tokens.
                    SecurityAlgorithms.HmacSha256
                    )
                    );
                //If authentication is successful and token has been created, the WriteToken(token) method converts the token object to a JWT string.
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            //If the login information is incorrect, return HTTP status code 401 (Unauthorized)
            return Unauthorized();
        }      

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPassword)
        {
            //Check if the model sent from the client is valid
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //Use _userManager to find users by email address
            var user = await _userManager.FindByEmailAsync(forgotPassword.email!);
            //Check if user exists
            if (user is null)
            {
                //If the user does not exist, notify that the request is invalid.
                return BadRequest("Invalid Request");
            }
            //Call the GeneratePasswordResetTokenAsync method to generate a password reset token for the user.
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //Create a dictionary containing the parameters that will be used in the URL.
            var param = new Dictionary<string, string?>
            {
                //Add password recovery token to dictionary
                { "token", token },
                //Add user email address to dictionary
                { "email", forgotPassword.email! }
            };
            //Use QueryHelpers to create a new URL by adding the parameters in the param dictionary to the clientUri that was provided.
            var callback = QueryHelpers.AddQueryString(forgotPassword.clientUri, param);
            //Call the send email method to send a password recovery email to the user's email address.
            await _emailSender.SendEmailAsync(user.Email,callback, "Reset password token");
            //If all steps are successful, the request will be processed successfully.
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword resetPassword)
        {
            //Check if the model sent from the client is valid
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //Use _userManager to find users by email address
            var user = await _userManager.FindByEmailAsync(resetPassword.email!);
            //Check if user exists
            if (user is null)
            {
                //If the user does not exist, notify that the request is invalid.
                return BadRequest("Invalid Request.");
            }
            //Call the ResetPasswordAsync method to reset the password for the user.
            var result = await _userManager.ResetPasswordAsync(user, resetPassword.Token!, resetPassword.password);
            //Check if password recovery was successful
            if (!result.Succeeded) {
                //If unsuccessful, get a list of errors from result and select the description of each error.
                var errors = result.Errors.Select(e => e.Description);
                //Returns HTTP status code 400
                return BadRequest(new { Error = errors });
            }
            //If all steps are successful it indicates that the request was processed successfully.
            return Ok("Reset successfully!");
        }

        [HttpGet("ID")]
        [Authorize]
        public async Task<IActionResult> GetProfileById([FromBody] Profile model)
        {
            //check registered user
            var userID = User?.Identity?.Name; 
            if(userID == null)
            {
                return Unauthorized();
            }
            //Use _userManager to find user by username based on userID from Profile model
            var user = await _userManager.FindByNameAsync(model.userID);
            //Check if user exists
            if (user is null) 
            {
                //If the user does not exist it will say that the user was not found.
                return NotFound();        
            }
            //Create an anonymous object containing the user's Email and PhoneNumber properties
            var profile = new
            {
                user.Email,
                user.PhoneNumber
            };
            //If all steps are successful look up the profile object containing the user profile information
            return Ok(profile);
        }

    }

}

