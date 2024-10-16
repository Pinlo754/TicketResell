
using System.ComponentModel.DataAnnotations;


namespace TicketResell_API.Controllers.User.Model
{
    public class Register
    {
        [Required]
        public string? email { get; set; } = string.Empty;
        [Required]
        public string? password { get; set; } = string.Empty;
        [Compare("password")]
        public string? confirmPassword { get; set; } = string.Empty;

    }
}
