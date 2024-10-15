using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class ResetPassword
    {
        public string? email { get; set; } = string.Empty;
        public string? newPassword { get; set; }
    }
}
