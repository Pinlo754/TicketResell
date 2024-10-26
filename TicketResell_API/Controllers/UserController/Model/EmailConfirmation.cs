using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.UserController.Model
{
    public class EmailConfirmation
    {

        [Required]
        public string? email { get; set; }
        [Required]
        public string? code { get; set; }
    }
}
