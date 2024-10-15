using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class EmailConfirmation
    {


        public string? email { get; set; }

        public int? code { get; set; }
    }
}
