using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using TicketResell_API.Controllers.ChatController.Model;
using TicketResell_API.Controllers.Service;

namespace TicketResell_API.Controllers.ChatController.ChatController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly AppDbContext _appDbContext;
        public ChatController(IChatService chatService, AppDbContext appDbContext)
        {
            _chatService = chatService;
            _appDbContext = appDbContext;
        }

        [HttpGet("get-chat/{seUserId}")]
        public async Task<ActionResult<List<Chat>>> GetChatsByUserId(string seUserId)
        {
            //get chat list by userId
            var chats = await _chatService.GetChatsByUserId(seUserId);
            //Check if no chat are found
            if (chats == null || !chats.Any())
            {
                return NotFound();
            }
            //Returns the list of chat
            return Ok(chats);

        }

        [HttpPost("post-chat")]
        public async Task<ActionResult<Chat>> PostChat([FromBody] Chat model)
        {
            //check the chat data and seUserId
            if (model == null || string.IsNullOrEmpty(model.seUserId))
            {
                return BadRequest("Chat data is null or Send User Id is missing. Please try again.");
            }
            foreach (var chatData in model.ChatData)
            {
                chatData.Chat = model;
            }
            //create and save chat
            var createChat = await _chatService.CreateChatAsync(model);
            //Returns the GetChatsByUserId and create a path to the newly created resource
            return CreatedAtAction(nameof(GetChatsByUserId), new { createChat.seUserId }, createChat);
        }

        [HttpGet("get-message/{messageId}")]
        public async Task<ActionResult<Message>> GetMessageById(string messageId)
        {
            //get all messages belonging to messageIds
            var message = await _chatService.GetMessageByIdAsync(messageId);
            //Check if no messages were found
            if (message == null || string.IsNullOrEmpty(messageId))
            {
                return NotFound(new { error = $"Message with ID {messageId} not found." });
            }
            //Returns a list of messages
            return Ok(message);
        }

        [HttpPost("post-message")]
        public async Task<ActionResult<Message>> PostMessage()
        {
            Message model = new Message();
            model.messageId = Guid.NewGuid().ToString();
            //save message 
            var createdMessage = await _chatService.CreateMessageAsync(model);
            //Returns the GetMessageById and create a path to the newly created resource
            return CreatedAtAction(nameof(GetMessageById), new { createdMessage.messageId }, createdMessage);
        }

        [HttpPut("update-message")]
        public async Task<ActionResult<Message>> UpdateMessage([FromBody] Message model)
        {
            if (model == null)
            {
                return BadRequest("Message data is null.");
            }

            var existingMessage = await _chatService.GetMessageByIdAsync(model.messageId);
            if (existingMessage == null)
            {
                return NotFound("Message not found.");
            }
            foreach (var messageData in model.Messages)
            {
                messageData.Message = model;
            }
            var updatedMessage = await _chatService.UpdateMessageAsync(model, model.messageId);

            if (updatedMessage == null)
            {
                return NotFound("Message not found.");
            }
            return Ok(updatedMessage);
        }


        [HttpPut("update-chat")]
        public async Task<ActionResult<Chat>> UpdateChat([FromBody] Chat model)
        {
            if (model == null)
            {
                return BadRequest("Chat data is null.");
            }

            foreach (var chatData in model.ChatData)
            {
                if (string.IsNullOrEmpty(chatData.reUserId))
                {
                    return BadRequest("ChatData contains an item with missing reUserId.");
                }
            }

            var updatedChat = await _chatService.UpdateChatAsync(model, model.seUserId);

            if (updatedChat == null)
            {
                return NotFound("Chat not found.");
            }

            return Ok(updatedChat);
        }
    }
}
