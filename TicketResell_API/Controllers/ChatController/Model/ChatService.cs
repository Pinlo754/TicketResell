using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.Service;

namespace TicketResell_API.Controllers.ChatController.Model
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
            //Add chat object to DbContext
            _context.Chats.Add(chat);
            // Save changes to database
            await _context.SaveChangesAsync();
            // Returns the saved chat object
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

        public async Task<Message?> GetMessageByIdAsync(string messageId)
        {
            return await _context.Message
                //add data from message data
                .Include(m => m.Messages)
                //Search Message by messageId
                .FirstOrDefaultAsync(c => c.messageId == messageId);
        }

        public async Task<Message> CreateMessageAsync(Message message)
        {
            // Add new message to context
            _context.Message.Add(message);
            // Save changes to database
            await _context.SaveChangesAsync();
            // Returns the message object after saving
            return message;
        }

        public async Task<Message> UpdateMessageAsync(Message updMessage, string messageId)
        {
            // Search for existing messages by messageId
            var existingMessage = await _context.Message
                 .Include(m => m.Messages)
                 .FirstOrDefaultAsync(m => m.messageId == messageId);
            // Check if message exists
            if (existingMessage == null)
            {
                // Return null if message not found
                return null;
            }
            // Update MessageData in existing message
            foreach (var updatedMessageData in updMessage.Messages)
            {
                var existingMessageData = existingMessage.Messages
                    .FirstOrDefault(md => md.Id == updatedMessageData.Id);

                if (existingMessageData != null)
                {
                    // If MessageData already exists, update the properties
                    existingMessageData.SeUserId = updatedMessageData.SeUserId;
                    existingMessageData.Data = updatedMessageData.Data;
                    existingMessageData.CreatedAt = updatedMessageData.CreatedAt;
                }
                else
                {
                    // If MessageData does not exist, add new one to the list
                    existingMessage.Messages.Add(updatedMessageData);
                }
            }
            // Save changes to database
            await _context.SaveChangesAsync();
            // Return the updated message
            return existingMessage;
        }

        public async Task<Chat> UpdateChatAsync(Chat updChat, string seUserId)
        {
            // Search existing chat by seUserId
            var existingChat = await _context.Chats
            .Include(c => c.ChatData)
            .FirstOrDefaultAsync(c => c.seUserId == seUserId);
            // Check if chat exists
            if (existingChat == null)
            {
                // Return null if chat not found
                return null;
            }
            // Update the ChatData in the existing chat
            foreach (var updatedChatData in updChat.ChatData)
            {
                var existingChatData = existingChat.ChatData
                    .FirstOrDefault(cd => cd.messageId == updatedChatData.messageId);

                if (existingChatData != null)
                {
                    // If ChatData already exists, update the properties
                    existingChatData.lastMessage = updatedChatData.lastMessage;
                    existingChatData.messageSeen = updatedChatData.messageSeen;
                    existingChatData.updatedAt = updatedChatData.updatedAt;
                    existingChatData.reUserId = updatedChatData.reUserId;
                    existingChatData.messageId = updatedChatData.messageId;
                }
                else
                {
                    // If ChatData does not exist, add new one to the list
                    existingChat.ChatData.Add(updatedChatData);
                }
            }
            // Save changes to database
            await _context.SaveChangesAsync();
            // Returns the updated chat
            return existingChat;

        }
    }
}
