namespace TicketResell_API.Controllers.UserController.Model
{
    public class UserWithRoles
    {
        public string userId { get; set; }
        public string? userImage { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? bio { get; set; }
        public string? gender { get; set; }
        public string? address { get; set; }
        public IList<string> roles { get; set; }
    }
}
