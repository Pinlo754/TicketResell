using TicketResell_API.Controllers.EventController.Model;

namespace TicketResell_API.Controllers.Service
{
    public interface IEmailSender
    {
        Task<string> SendConfirmationEmailAsync(string? email, string emailCode);
        Task SendEmailAsync(string? email, string callback, string v);
        Task<string> SendPasswordResetEmailAsync(string? email, string? resetToken);
        Task<string> SendOrderConfirmationEmailAsync(string? email, string? orderId, string? eventName, string? ticketDetails);
        string GenerateConfirmationCode(string? email);
        Task SendUpcomingEventEmailAsync(string email, Event eventItem);
    }
}
