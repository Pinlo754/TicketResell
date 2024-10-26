using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.UserController.Model
{
    public class UserRole
    {
        [Required]
        public string email { get; set; } = string.Empty;
        [Required]
        public string role { get; set; } = string.Empty;
    }
}
