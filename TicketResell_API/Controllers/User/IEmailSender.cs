
namespace TicketResell_API.Controllers.User
{
    public interface IEmailSender
    {
        Task<string> SendConfirmationEmailAsync(string? email, string emailCode);
        Task SendEmailAsync(string? email, string callback, string v);
    }
}
