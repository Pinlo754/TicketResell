using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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

        public AccountController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var user = new IdentityUser { UserName = model.phoneNumber };
            var result = await _userManager.CreateAsync(user, model.password);
            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully" });
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.phoneNumber);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.password))
            {
                var userRole = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.PhoneNumber!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                authClaims.AddRange(userRole.Select(role => new Claim(ClaimTypes.Role, role)));

                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    expires: DateTime.Now.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"]!)),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)),
                    SecurityAlgorithms.HmacSha256
                    )
                    );
                return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            return Unauthorized();
        }

        [HttpPost("Add-Role")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(role));
                if (result.Succeeded)
                {
                    return Ok(new { message = "Role add successfully" });
                }
                return BadRequest(result.Errors);
            }
            return BadRequest("Role already exists");
        }

        [HttpPost("Assign-Role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRole model)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == model.phoneNumber);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, model.role);

            if (result.Succeeded)
            {
                return Ok(new { message = "Role assigned sucessfully" });
            }
            return BadRequest(result.Errors);


        }
    }
}
