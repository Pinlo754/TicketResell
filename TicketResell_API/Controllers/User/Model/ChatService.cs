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

        public async Task<Chat> CreateChatAsync(Chat chat)
        {
            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();
            return chat;

        }

        public async Task<List<Chat>> GetChatsByUserId(string userId)
        {
            return await _context.Chats
            //filter chats so that only chats seUserId = userId
            .Where(c => c.seUserId == userId)
            //Get data from ChatData
            .Include(c => c.ChatData)
            //return a list
            .ToListAsync();
        }

        public async Task<List<Message>> GetMessageByIdAsync(string messageId)
        {
            return await _context.Message
                //filter Message so that only message messageId=messageId
                .Where(c => c.messageId! == messageId)
                //list all message
                .ToListAsync();
        }

        public async Task<Message> CreateMessageAsync(Message message)
        {
            _context.Message.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }

    }
}
