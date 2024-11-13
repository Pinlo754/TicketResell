using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.NotificationController.Model;

namespace TicketResell_API.Controllers.NotificationController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }


        // 1. API tạo thông báo mới
        [HttpPost("create")]
        public async Task<ActionResult> CreateNotification(Notification notification)
        {
            try
            {
                // Kiểm tra thông tin đầu vào
                if (notification == null)
                {
                    return BadRequest("Invalid notification data.");
                }

                // Thêm thông báo vào cơ sở dữ liệu
                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();

                return Ok("Notification created successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // 2. API lấy danh sách thông báo theo người dùng
        [HttpGet("get-by-user/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotificationsByUser(string userId)
        {
            try
            {
                // Tìm các thông báo của người dùng
                var notifications = await _context.Notifications
                                                  .Where(n => n.toUserId == userId)
                                                  .ToListAsync();
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // 3. API lấy thông tin chi tiết của một thông báo
        [HttpGet("get/{notificationId}")]
        public async Task<ActionResult<Notification>> GetNotificationById(string notificationId)
        {
            try
            {
                // Tìm thông báo theo ID
                var notification = await _context.Notifications
                                                 .FirstOrDefaultAsync(n => n.notificationId == notificationId);
                if (notification == null)
                {
                    return NotFound("Notification not found.");
                }

                return Ok(notification);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // 4. API xóa thông báo
        [HttpDelete("delete/{notificationId}")]
        public async Task<ActionResult> DeleteNotification(string notificationId)
        {
            try
            {
                // Tìm thông báo theo ID
                var notification = await _context.Notifications
                                                 .FirstOrDefaultAsync(n => n.notificationId == notificationId);
                if (notification == null)
                {
                    return NotFound("Notification not found.");
                }

                // Xóa thông báo
                _context.Notifications.Remove(notification);
                await _context.SaveChangesAsync();

                return Ok("Notification deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }


}

