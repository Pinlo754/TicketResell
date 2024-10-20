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

        public async Task<Message> UpdateMessageAsync(Message updMessage, string messageId)
        {
            var existingMessage = await _context.Message
                 .Include(m => m.Messages) 
                 .FirstOrDefaultAsync(m => m.messageId == messageId);
            if (existingMessage == null)
            {
                return null;
            }
            foreach (var updatedMessageData in updMessage.Messages)
            {
                var existingMessageData = existingMessage.Messages
                    .FirstOrDefault(md => md.Id == updatedMessageData.Id);

                if (existingMessageData != null)
                {
                    existingMessageData.SeUserId = updatedMessageData.SeUserId;
                    existingMessageData.Data = updatedMessageData.Data;
                    existingMessageData.CreatedAt = updatedMessageData.CreatedAt;
                }
                else
                {
                    existingMessage.Messages.Add(updatedMessageData);
                }
            }          
                await _context.SaveChangesAsync(); 
            return existingMessage; 
        }

        public async Task <Chat> UpdateChatAsync(Chat updChat, string seUserId)
        {
            var existingChat = await _context.Chats
            .Include(c => c.ChatData) 
            .FirstOrDefaultAsync(c => c.seUserId == seUserId);
            if (existingChat == null) 
            {
                return null;
            }
            foreach (var updatedChatData in updChat.ChatData)
            {
                var existingChatData = existingChat.ChatData
                    .FirstOrDefault(cd => cd.messageId == updatedChatData.messageId);

                if (existingChatData != null)
                {
                    existingChatData.lastMessage = updatedChatData.lastMessage;
                    existingChatData.messageSeen = updatedChatData.messageSeen;
                    existingChatData.updatedAt = DateTime.UtcNow;
                    existingChatData.reUserId = updatedChatData.reUserId;
                    existingChatData.messageId = updatedChatData.messageId;
                }
                else
                {
                    existingChat.ChatData.Add(updatedChatData);
                }
            }
            await _context.SaveChangesAsync();

            return existingChat;

        }
    }
}
