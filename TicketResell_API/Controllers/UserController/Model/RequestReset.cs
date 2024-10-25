using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.UserController.Model
{
    public class RequestReset
    {
        [Required]
        public string? email { get; set; }
    }
}
