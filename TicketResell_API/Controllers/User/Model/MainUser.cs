using Microsoft.AspNetCore.Identity;

namespace TicketResell_API.Controllers.User.Model
{
    public class MainUser : IdentityUser
    {
        public int FailedConfirmationAttemps { get; set; } = 0;
    }
}
