using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.User.Service
{
    public interface IChatService
    {
        Task<List<Chat>> GetChatsByUserId(string userId);
        Task<Chat> CreateChatAsync(Chat chat);
        Task<Message> GetMessageByIdAsync(string messageId);
        Task<Message> CreateMessageAsync(Message message);
        Task<Message> UpdateMessageAsync(Message updMessage, string messageId);
        Task<Chat> UpdateChatAsync (Chat updChat, string seUserId);
    }
}
