using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.User
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new {message = "You have accessed the Admin Controller"});
        }
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<MainUser> _userManager;
        public AdminController(RoleManager<IdentityRole> roleManager, UserManager<MainUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            //Check if the role with the given name exists in the system.
            if (!await _roleManager.RoleExistsAsync(role))
            {
                //If the role does not exist, create a new role using _roleManager
                var result = await _roleManager.CreateAsync(new IdentityRole(role));
                //Check if adding role was successful
                if (result.Succeeded)
                {
                    //If the role addition is successful it returns HTTP status code 200
                    return Ok(new { message = "Role add successfully" });
                }
                //If adding the role fails, return HTTP status code 400
                return BadRequest(result.Errors);
            }
            //If the role already exists notify that the role already exists in the system.
            return BadRequest("Role already exists");
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRole model)
        {
            //Use _userManager to find users by email address
            var user = await _userManager.FindByEmailAsync(model.email);
            //Check if user exists
            if (user == null)
            {
                //If the user does not exist it will say that the user was not found.
                return BadRequest("User not found");
            }
            //If the user exists, call the AddToRoleAsync method to assign the role to the user.
            var result = await _userManager.AddToRoleAsync(user, model.role);
            //Check if role assignment was successful
            if (result.Succeeded)
            {
                //If the role assignment is successful, it will notify that the role has been assigned successfully.
                return Ok(new { message = "Role assigned sucessfully" });
            }
            //If the role assignment fails, notify of errors that occurred during the role assignment process.
            return BadRequest(result.Errors);
        }
    }
}
