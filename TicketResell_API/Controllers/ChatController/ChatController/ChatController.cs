using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.ChatController.Model;
using TicketResell_API.Controllers.Service;

namespace TicketResell_API.Controllers.ChatController.ChatController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
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
        public async Task<ActionResult<Message>> PostMessage([FromBody] Message model)
        {
            //check data and message is null or not
            if (model == null || string.IsNullOrEmpty(model.messageId))
            {
                return BadRequest("Message data is null or message id is missing. Please try again.");
            }
            //save message 
            var createdMessage = await _chatService.CreateMessageAsync(model);
            //Returns the GetMessageById and create a path to the newly created resource
            return CreatedAtAction(nameof(GetMessageById), new { createdMessage.messageId }, createdMessage);
        }

        [HttpPut("{messageId}")]
        public async Task<ActionResult<Message>> UpdateMessage([FromBody] Message model, string messageId)
        {
            if (model == null || string.IsNullOrEmpty(messageId))
            {
                return BadRequest("Message data is null.");
            }
            var result = await _chatService.UpdateMessageAsync(model, messageId);

            if (result == null)
            {
                return NotFound("Message not found.");
            }
            return Ok(result);
        }

        [HttpPut("update-chat/{seUserId}")]
        public async Task<ActionResult<Chat>> UpdateChat([FromBody] Chat model, string seUserId)
        {
            if (model == null)
            {
                return BadRequest("Chat data is null.");
            }

            var updatedChat = await _chatService.UpdateChatAsync(model, seUserId);

            if (updatedChat == null)
            {
                return NotFound("Chat not found.");
            }

            return Ok(updatedChat);
        }
    }
}
