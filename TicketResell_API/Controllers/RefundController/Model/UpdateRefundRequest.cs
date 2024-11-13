using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.RefundController.Model
{
    public class UpdateRefundRequest
    {
        [MaxLength(450)][Key] public string? requestId { get; set; }
        public string? status { get; set; }

    }
}
