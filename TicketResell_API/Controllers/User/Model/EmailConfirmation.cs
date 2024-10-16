




using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class EmailConfirmation
    {

        [Required]
        public string? email { get; set; }
        [Required]
        public int? code { get; set; }
    }
}
