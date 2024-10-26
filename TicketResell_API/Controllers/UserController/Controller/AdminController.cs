using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketResell_API.Controllers.UserController.Model;
namespace TicketResell_API.Controllers.UserController.Controller
{
    //[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "You have accessed the Admin Controller" });
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

        [HttpDelete("delete-user/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            //find user by Id
            var deUser = await _userManager.FindByIdAsync(userId);
            //check if user is null or not
            if (deUser == null)
            {
                return BadRequest("User not found");
            }
            //delete user
            var result = await _userManager.DeleteAsync(deUser);
            //if false return 500
            if (!result.Succeeded)
            {
                return StatusCode(500, "Failed to delete user");
            }
            return Ok("User deleted successfully");
        }

        [HttpPut("update-role")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRole model)
        {
            //check input information
            if (model == null || string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.newRole))
            {
                return BadRequest("Email and role are required.");
            }

            //find user by email
            var user = await _userManager.FindByEmailAsync(model.email);
            if (user == null) 
            {
                return NotFound("User not found");
            }

            //Delete all current user roles
            var currentRole = await _userManager.GetRolesAsync(user);
            var removeRole = await _userManager.RemoveFromRolesAsync(user, currentRole);
            if (!removeRole.Succeeded)
            {
                return BadRequest("Failed to remove current roles.");
            }

            var addResult = await _userManager.AddToRoleAsync(user, model.newRole);
            if (!addResult.Succeeded)
            {
                return BadRequest("Failed to add new role.");
            }

            return Ok("User role updated successfully.");
        }

    }
}
