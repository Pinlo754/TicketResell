using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.RefundController.Model;

namespace TicketResell_API.Controllers.RefundController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefundController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RefundController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("list-all-request")]
        public async Task<ActionResult<List<RefundRequest>>> GetAllRequest()
        {
            //list all refund request
            var refundRequest = await _context.RefundRequests.ToListAsync();
            return Ok(refundRequest);
        }

        [HttpGet("get-refund-request/{requestId}")]
        public async Task<IActionResult> GetRefundRequestById(string requestId)
        {
            //find request
            var request = await _context.RefundRequests.FindAsync(requestId);
            if (request == null) 
            {
                return NotFound("No refund request found");
            }
            return Ok(request);

        }

        [HttpPost("create-request")]
        public async Task<IActionResult> PostRefundRequest(RefundRequest model)
        {
            //check if model null or not
            if (model == null)
            {
                return BadRequest("Invalid refund request");
            }

            //create refund information
            model.requestId = Guid.NewGuid().ToString();
            model.status = "Pending";
            //add new request
            await _context.RefundRequests.AddAsync(model);
            //save to db
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRefundRequestById), new { requestId = model.requestId }, model);
        }

        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatusRefund(UpdateRefundRequest model)
        {
            //find request
            var request = await _context.RefundRequests.FirstOrDefaultAsync(c => c.requestId == model.requestId);
            //check if request null or not
            if(request == null)
            {
                return BadRequest("Refund Request not found");
            }

            request.status = model.status;

            var result = await _context.SaveChangesAsync();
            if(result <= 0)
            {
                return BadRequest("Update status failed");
            }
            return Ok("Update status successfully");
        }
            
    }
}
