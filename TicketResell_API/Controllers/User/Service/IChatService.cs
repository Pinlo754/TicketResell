using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.User.Service
{
    public interface IChatService
    {
        Task<List<Chat>> GetChatsByUserId(string userId);
        Task<Chat> CreateChatAsync(Chat chat);
        Task<List<Message>> GetMessageByIdAsync(string messageId);
    }
}
