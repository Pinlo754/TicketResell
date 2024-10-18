using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.User.Service;

namespace TicketResell_API.Controllers.User
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

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Chat>>> GetAllChats(string userId)
        {
            //get chat list by userId
            var chats = await _chatService.GetAllChatsAsync(userId);
            //Check if no chat are found
            if (chats == null || !chats.Any())
            {
                return NotFound();
            }
            //Returns the list of chat
            return Ok(chats);

        }

        [HttpGet("message/{chatId}")]
        public async Task<ActionResult> GetMessageByChatId(string chatId)
        {
            //get all messages belonging to chatId
            var message = await _chatService.GetMessagesByChatIdAsync(chatId);
            //Check if no messages were found
            if (message == null || !message.Any())
            {
                return NotFound();
            }
            //Returns a list of messages
            return Ok(message);

        }
    }
}
