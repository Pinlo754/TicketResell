using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.User.Service
{
    public interface IChatService
    {
        Task<List<Chat>> GetAllChatsAsync(string userId);
        Task<List<Message>> GetMessagesByChatIdAsync(string chatId);
    }
}
