using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Chat
    {

       [Key] public string? seUserId {  get; set; }
       public List<ChatData> ChatData { get; set; } = new List<ChatData>();
    }
}
