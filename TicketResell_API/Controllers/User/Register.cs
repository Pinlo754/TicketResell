using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User
{
    public class Register
    {
        public string? firstName {  get; set; } = string.Empty;
        public string? lastName { get; set; } = string.Empty ;
        public string? email { get; set; } = string.Empty ;  
        public string? phoneNumber { get; set; } = string.Empty;
        public string? password { get; set; } = string.Empty;
        public string? confirmPassword {  get; set; } = string.Empty ;

    }
}
