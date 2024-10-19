using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class MessageData
    {
        [Key] public string? messageDataId {  get; set; }
        public DateTime? createdAt { get; set; }  = DateTime.UtcNow;
        public string? seUserId { get; set; } 
        public string? Data { get; set; } 
    }
}
