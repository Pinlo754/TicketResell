using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.TicketController.Model
{
    public class UpdateStatusTicket
    {
        [MaxLength(450)] public String ticketId { get; set; }
        public string status { get; set; }

    }
}
