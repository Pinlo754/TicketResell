using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User
{
    public class ResetPassword
    {
        
        public string? password { get; set; }
        public string? confirmPassword { get; set; }
        [Compare("password")]

        public string? email { get; set; }
        public string? Token { get; set; }


    }
}
