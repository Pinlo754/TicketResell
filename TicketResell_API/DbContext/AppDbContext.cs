using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.User.Model;

public class AppDbContext : IdentityDbContext<MainUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Message { get; set; }

    public DbSet<Event> Events { get; set; }


}
