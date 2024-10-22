using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class MainUser : IdentityUser
    {
        
        public string? firstName { get; set; }
        [MaxLength(256)]
        public string? lastName { get; set; }
        [MaxLength(256)]
        public string bio {  get; set; }
         
        public string? address {  get; set; }
        public int FailedConfirmationAttemps { get; set; } = 0;
    }
}
