using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User
{
    public class ForgotPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string? email { get; set; }

        [Required]
        public string? clientUri { get; set; }
    }
}
