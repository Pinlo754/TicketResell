using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.EventController.Model;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.UserController.Model;

namespace TicketResell_API.Controllers.TicketController.Model;

public partial class Ticket
{
    [MaxLength(450)] public String ticketId { get; set; }

    public string ticketName { get; set; } = null!;

    public int quantity { get; set; }

    public decimal price { get; set; }

    public decimal originPrice { get; set; }

    public string[] imagesVerify { get; set; } = null!;

    public string[] imagesQR { get; set; } = null!;

    [MaxLength(450)] public string? userId { get; set; }

    public string? type { get; set; }

    public string? section { get; set; }

    public int? row { get; set; }

    public string? description { get; set; }

    public string status { get; set; }

    [MaxLength(450)] public string? eventId { get; set; }

    public DateTime createAt { get; set; }

    public DateTime? updateAt { get; set; }

    // Navigation properties
    [JsonIgnore]
    public MainUser? User { get; set; }
    [JsonIgnore]
    public Event? Event { get; set; }
    [JsonIgnore]
    public ICollection<OrderDetail>? OrderDetails { get; set; }

}