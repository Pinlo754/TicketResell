using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Register
    {
        public string? email { get; set; } = string.Empty;
        public string? password { get; set; } = string.Empty;
        public string? confirmPassword { get; set; } = string.Empty;

    }
}
