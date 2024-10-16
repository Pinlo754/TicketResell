
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class ResetPassword
    {
        [Required]
        public string? email { get; set; } = string.Empty;
        [Required]
        public string? newPassword { get; set; }
    }
}
