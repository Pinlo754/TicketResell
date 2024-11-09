using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.CommentController.Model;

namespace TicketResell_API.Controllers.CommentController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public CommentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        [HttpGet("{userId}")]
        public async Task<ActionResult<Comment>> GetCommentById(string userId)
        {
            var comment = await _appDbContext.Comment.FindAsync(userId);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpGet("list-comment/{userId}")]
        public async Task<ActionResult<List<Comment>>> GetAllCommentByUser(string userId)
        {
            var comments = await _appDbContext.Comment
                .Where(c => c.userId == userId)
                .ToListAsync();

            return Ok(comments);
        }

        [HttpGet("list-comment")]
        public async Task<ActionResult<List<Comment>>> GetAllComment()
        {
            return Ok(await _appDbContext.Comment.ToListAsync());
        }

        [HttpPost("create-comment")]
        public async Task<ActionResult<Comment>> CreateComment(Comment model)
        {
            model.commentId = Guid.NewGuid().ToString();
            model.time = DateTime.Now;
            _appDbContext.Comment.Add(model);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCommentById), new { userId = model.commentId }, model);
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult> UpdateComment(string userId, Comment updateComment)
        {
            var existingComment = await _appDbContext.Comment.FindAsync(userId);
            if (existingComment == null)
            {
                return NotFound("User not found");
            }

            existingComment.rating = updateComment.rating;
            existingComment.comment = updateComment.comment;
            existingComment.time = DateTime.Now;
            existingComment.toUserId = updateComment.toUserId;
            existingComment.orderId = updateComment.orderId;

            await _appDbContext.SaveChangesAsync();

            return Ok(existingComment);
        }

        [HttpDelete("remove-comment/{userId}")]
        public async Task<ActionResult> DeleteComment(string userId)
        {
            var comment = await _appDbContext.Comment.FindAsync(userId);
            if(comment == null)
            {
                return NotFound("Not found any comment on this user");
            }
            _appDbContext.Comment.Remove(comment);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
