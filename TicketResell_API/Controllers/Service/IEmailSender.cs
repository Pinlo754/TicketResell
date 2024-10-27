namespace TicketResell_API.Controllers.Service
{
    public interface IEmailSender
    {
        Task<string> SendConfirmationEmailAsync(string? email, string emailCode);
        Task SendEmailAsync(string? email, string callback, string v);
        Task<string> SendPasswordResetEmailAsync(string? email, string? resetToken);
        string GenerateConfirmationCode(string? email);
    }
}
