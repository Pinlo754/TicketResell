using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.User.Service;

namespace TicketResell_API.Controllers.User.Model
{
    public class ChatService : IChatService
    {
        private readonly AppDbContext _context;
        public ChatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Chat>> GetAllChatsAsync(string userId)
        {
            return await _context.Chats
                //Download all messages related to each chat
                .Include(c => c.Messages)
                // Filter conversations by user ID
                .Where( c => c.reUserId == userId || c.seUserId == userId)
                //Convert query results to a list
                .ToListAsync();
        }

        public async Task<List<Message>> GetMessagesByChatIdAsync(string chatId)
        {
            return await _context.Message
                //Filter messages whose ChatId matches the provided chatId.
                .Where(c => c.chatId == chatId)
                //Convert query results to a list
                .ToListAsync();
        }
    }
}
