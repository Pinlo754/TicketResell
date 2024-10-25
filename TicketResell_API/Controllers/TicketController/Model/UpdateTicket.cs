namespace TicketResell_API.Controllers.TicketController.Model;

public partial class UpdateTicket
{

    public string ticketName { get; set; } = null!;

    public int? quantity { get; set; }

    public decimal price { get; set; }

    public decimal originPrice { get; set; }

    public string image { get; set; } = null!;

    public string userId { get; set; }

    public string? description { get; set; }

    public DateTime? time { get; set; }

    public bool isValid { get; set; }

    public string? location { get; set; }

    public string eventId { get; set; }

    public DateTime? createAt { get; set; }

    public DateTime? updateAt { get; set; }

}