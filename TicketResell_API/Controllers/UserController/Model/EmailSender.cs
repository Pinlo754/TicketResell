using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using System.Security.Cryptography;
using System.Text;
using TicketResell_API.Controllers.EventController.Model;
using IEmailSender = TicketResell_API.Controllers.Service.IEmailSender;

namespace TicketResell_API.Controllers.UserController.Model
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
        // sending confirmation email
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
        //send email request password reset
        public async Task<string> SendPasswordResetEmailAsync(string email, string validToken)
        {
            string resetLink = $"http://localhost:3000/reset-password?token={validToken}&email={email}";
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<!DOCTYPE html>");
            emailMessage.AppendLine("<html lang=\"en\">");
            emailMessage.AppendLine("<head>");
            emailMessage.AppendLine("     <meta charset=\"UTF-8\">");
            emailMessage.AppendLine("     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
            emailMessage.AppendLine("     <title>Password Reset</title>");
            emailMessage.AppendLine("     <style>");
            emailMessage.AppendLine("     body { font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; }");
            emailMessage.AppendLine("     .email-container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }");
            emailMessage.AppendLine("     h1 { color: #323232; }");
            emailMessage.AppendLine("     p { color: #555; }");
            emailMessage.AppendLine("     .button { background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; }");
            emailMessage.AppendLine("     .button:hover { background-color: #218838; }");
            emailMessage.AppendLine("     </style>");
            emailMessage.AppendLine("</head>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine("     <div class=\"email-container\">");
            emailMessage.AppendLine($"     <h1>Hello, {email}</h1>");
            emailMessage.AppendLine("      <p>You requested to set a new password for your account. Click the button below to reset your password:</p>");
            emailMessage.AppendLine($"      <p><a href=\"{resetLink}\" class=\"button\">Reset Your Password</a></p>");
            emailMessage.AppendLine("      <p>If you did not request this, please ignore this email.</p>");
            emailMessage.AppendLine("      <p>Thank you, <br>Ticket-Resell</p>");
            emailMessage.AppendLine("    </div>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();
            await SendEmailAsync(email, "Password Reset", message);

            return "Please check your email for the password reset link";
        }


        string IEmailSender.GenerateConfirmationCode(string? email)
        {
            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes("SecretKey")))
            {
                var currentTime = DateTime.UtcNow.ToString("yyyyMMddHH");
                var data = $"{email}:{currentTime}";

                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));

                // Convert to positive integer and take last 6 digits
                int code = BitConverter.ToInt32(hashBytes, 0) & 0x7FFFFFFF; // Ensure positive integers
                return (code % 1000000).ToString("D6"); // 6 digit guarantee
            }
        }

        //send a http form of order confirm
        public async Task<string> SendOrderConfirmationEmailAsync(string? email, string? orderId, string? eventName, string? ticketDetails, string[]? imagesQR)
        {
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<!DOCTYPE html>");
            emailMessage.AppendLine("<html lang=\"en\">");
            emailMessage.AppendLine("<head>");
            emailMessage.AppendLine("     <meta charset=\"UTF-8\">");
            emailMessage.AppendLine("     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
            emailMessage.AppendLine("     <title>Order Confirmation</title>");
            emailMessage.AppendLine("     <style>");
            emailMessage.AppendLine("     body { font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; }");
            emailMessage.AppendLine("     .email-container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }");
            emailMessage.AppendLine("     h1 { color: #323232; }");
            emailMessage.AppendLine("     p { color: #555; }");
            emailMessage.AppendLine("     .button { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; }");
            emailMessage.AppendLine("     .button:hover { background-color: #0056b3; }");
            emailMessage.AppendLine("     </style>");
            emailMessage.AppendLine("</head>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine("     <div class=\"email-container\">");
            emailMessage.AppendLine($"     <h1>Thank you for your purchase, {email}</h1>");
            emailMessage.AppendLine($"      <p>Your order ID is: <strong>{orderId}</strong></p>");
            emailMessage.AppendLine($"      <p>Event: <strong>{eventName}</strong></p>");
            emailMessage.AppendLine($"      <p>Ticket Details: <strong>{ticketDetails}</strong></p>");
            emailMessage.AppendLine("      <p>We are excited to have you join us at the event. Please keep this email as your confirmation.</p>");
            // Add QR code images if available
            if (imagesQR != null && imagesQR.Length > 0)
            {
                emailMessage.AppendLine("      <div class=\"qr-code\">");
                emailMessage.AppendLine("      <p>Here are your QR codes for entry:</p>");
                foreach (var imageUrl in imagesQR)
                {
                    emailMessage.AppendLine($"      <img src=\"{imageUrl}\" alt=\"QR Code\" width=\"150\" height=\"150\" style=\"margin: 10px;\">");
                }
                emailMessage.AppendLine("      </div>");
            }
            emailMessage.AppendLine("      <br>");
            emailMessage.AppendLine("      <p>Best regards, <br>Ticket-Resell Team</p>");
            emailMessage.AppendLine("    </div>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();
            await SendEmailAsync(email, "Order Confirmation", message);

            return "Order confirmation email sent successfully";
        }

        public async Task SendUpcomingEventEmailAsync(string email, Event eventItem)
        {
                string subject = $"Upcoming Event: {eventItem.eventName}";
                string message = $"<h2>Upcoming Event</h2>" +
                                 $"<p>The event <strong>{eventItem.eventName}</strong> will take place on <strong>{eventItem.eventTime}</strong> at <strong>{eventItem.location}, {eventItem.city}</strong>.</p>";
                await SendEmailAsync(email, "Upcoming Event", message);           
        }
    }

}

