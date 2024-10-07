using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;

namespace TicketResell_API.Controllers.User
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            using (var client = new SmtpClient(_emailConfig.SmtpServer, _emailConfig.Port))
            {
                client.Credentials = new NetworkCredential(_emailConfig.Username, _emailConfig.Password);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_emailConfig.From),
                    Subject = subject,
                    Body = htmlMessage,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(email);

                try
                {
                    await client.SendMailAsync(mailMessage);
                }
                catch (Exception ex)
                {
                    // Log hoặc xử lý ngoại lệ
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    throw;
                }
            }
        }
    }
}
