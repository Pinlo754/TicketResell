namespace TicketResell_API.Controllers.User.Model
{
    public class Message
    {
        public string chatId { get; set; } = Guid.NewGuid().ToString();//create unique id for message
        public string? messageId { get; set; }
        public DateTime? createAt { get; set; }
        public string? text { get; set; }
        public string? sid {  get; set; }
        public bool messageSeen { get; set; } = false;
    }
}
