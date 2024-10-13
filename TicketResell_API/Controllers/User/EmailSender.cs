using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using System.Text;

namespace TicketResell_API.Controllers.User
{
    public class EmailSender : IEmailSender
    {
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUser = "ticketresellswp@gmail.com";
        private readonly string _smtpPass = "lsyu ydda lxzv uxmu";

        //Asynchronous email sending method
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var _email = new MimeMessage();
            _email.From.Add(new MailboxAddress("Ticket-Resell", _smtpUser));
            _email.To.Add(new MailboxAddress("", email));
            _email.Subject = subject;
            _email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = htmlMessage
            };

            using (var smtp = new SmtpClient())
            {
                await smtp.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_smtpUser, _smtpPass);
                await smtp.SendAsync(_email);
                await smtp.DisconnectAsync(true);
            }
        }
        public async Task<string> SendConfirmationEmailAsync(string email, string emailCode)
        {
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<Html>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine($"<p>Dear {email},</p>");
            emailMessage.AppendLine("<p>Thank you for registering with us. To verify your email please use this verification code:</p>");
            emailMessage.AppendLine($"<h2>Verification Code: {emailCode} </h2>");
            emailMessage.AppendLine("<p>Please enter this code to verify your account.</p>");
            emailMessage.AppendLine("<br>");
            emailMessage.AppendLine("<p>Best regards,</p>");
            emailMessage.AppendLine("<p><strong>Ticket-Resell</strong></p>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();
            await SendEmailAsync(email, "Email Confirmation", message);

            return "Thank you for registering with us";
        }
    }

}

