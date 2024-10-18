namespace TicketResell_API.Controllers.User.Model
{
    public class Chat
    {
        public string? chatId { get; set; } = Guid.NewGuid().ToString();// make unique id for chat
        public string? reUserId { get; set; }
        public string? seUserId { get; set; }
        public string? lastMessage {  get; set; }
        public DateTime updateAt { get; set; } = DateTime.UtcNow;
        //public string? messageId { get; set; }
        public List<Message> Messages { get; set; } = new List<Message>();
    }
}
