﻿namespace TicketResell_API.Controllers.UserController.Model
{
    public class UpdateProfile
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? address { get; set; }
        public string? gender { get; set; }
        public string? userImage { get; set; }
        public string? bio { get; set; }
    }
}
