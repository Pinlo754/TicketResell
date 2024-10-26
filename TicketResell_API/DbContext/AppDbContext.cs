using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.ChatController.Model;
using TicketResell_API.Controllers.EventController.Model;
using TicketResell_API.Controllers.UserController.Model;
using TicketResell_API.Controllers.TicketController.Model;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.CartController.Model;
using TicketResell_API.Controllers.OrderController.Model;

public class AppDbContext : IdentityDbContext<MainUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Message { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Order> Orders { get; set; }
   public DbSet<OrderDetail> OrderDetails { get; set; }


}
