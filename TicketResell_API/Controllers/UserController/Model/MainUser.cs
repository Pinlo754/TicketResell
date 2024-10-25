using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.UserController.Model
{
    public class MainUser : IdentityUser
    {
        public string? userImage { get; set; }
        public string? firstName { get; set; }
        [MaxLength(256)]
        public string? lastName { get; set; }
        [MaxLength(256)]
        public string? bio { get; set; } = string.Empty;
        public string? gender { get; set; }
        public string? address { get; set; }
        public int FailedConfirmationAttemps { get; set; } = 0;
    }
}
