using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class RequestReset
    {
        [Required]
        public string? email { get; set; }
    }
}
