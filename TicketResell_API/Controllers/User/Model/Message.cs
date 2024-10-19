namespace TicketResell_API.Controllers.User.Model
{
    public class Message
    {
        public string? messageId { get; set; }
        public List<MessageData> messages { get; set; } = new List<MessageData>();
    }
}
