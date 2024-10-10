using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TicketResell_API.Controllers.User
{
    [Authorize(Roles = "Staff")]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "You have accessed the Staff Controller" });
        }
    }
}
