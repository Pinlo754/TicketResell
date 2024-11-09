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
using TicketResell_API.Controllers.CommentController.Model;
using TicketResell_API.Controllers.WalletController.Model;

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
    public DbSet<Comment> Comment { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Call the base method to set the Identity
        base.OnModelCreating(modelBuilder);

        // Set up relationship between `Order` and `MainUser`
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.userId)
            //if user delete ,order delete too
            .OnDelete(DeleteBehavior.Cascade);

        // Set up the relationship between `Ticket` and `MainUser`
        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.User)
            .WithMany(u => u.Tickets)
            .HasForeignKey(t => t.userId)
            //if user delete, ticket which user create  delete
            .OnDelete(DeleteBehavior.Cascade);

        // Set up the relationship between `Ticket` and `Event`
        modelBuilder.Entity<Ticket>()
            .HasOne(t => t.Event)
            .WithMany(e => e.Tickets)
            .HasForeignKey(t => t.eventId)
            //if ticket delete, event not delete
            .OnDelete(DeleteBehavior.Restrict);

        // Set up the relationship between `OrderDetail` and `Order`
        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Order)
            .WithMany(o => o.OrderDetails)
            .HasForeignKey(od => od.orderId)
            //if order delete,orderDetail delete too
            .OnDelete(DeleteBehavior.Cascade);

        // Set up relationship between `OrderDetail` and `Ticket`
        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Tickets)
            .WithMany(t => t.OrderDetails)
            .HasForeignKey(od => od.ticketId)
            //if orderDetail delete, ticket not delete
            .OnDelete(DeleteBehavior.Restrict);

        // Set up relationship between `Comment` and `MainUser`
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.userId)
            //user delete comment delete too
            .OnDelete(DeleteBehavior.Cascade);

        // Set up the relationship between `Comment` and `Order`
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Order)
            .WithMany(o => o.Comments)
            .HasForeignKey(c => c.orderId)
            //order delete comment not
            .OnDelete(DeleteBehavior.Restrict);

        // Set up relationship between `Chat` and `MainUser`
        modelBuilder.Entity<Chat>()
            .HasOne(c => c.User)
            .WithMany(u => u.Chats)
            .HasForeignKey(c => c.seUserId)
            //user delete chat delete too
            .OnDelete(DeleteBehavior.Cascade);


        // Set up the relationship between `ChatData` and `Chat`
        modelBuilder.Entity<ChatData>()
            .HasOne(cd => cd.Chat)
            .WithMany(c => c.ChatData)
            .HasForeignKey(cd => cd.ChatSeUserId)
            //chat delete chatdata delete too
            .OnDelete(DeleteBehavior.Cascade);


        // Set up the relationship between `ChatData` and `Message`
        modelBuilder.Entity<ChatData>()
            .HasOne(cd => cd.Message)
            .WithMany()
            .HasForeignKey(cd => cd.messageId)
            //chatData delete message delete too
            .OnDelete(DeleteBehavior.Cascade);



        // Set up relationship between `Cart` and `MainUser` (User)
        modelBuilder.Entity<Cart>()
            .HasOne(c => c.User)
            .WithMany(u => u.Carts)
            .HasForeignKey(c => c.userId)
            //user delete cart delete too
            .OnDelete(DeleteBehavior.Restrict);


        // Set up relationship between `Cart` and `MainUser` (Seller)
        modelBuilder.Entity<Cart>()
            .HasOne(c => c.Seller)
            .WithMany()
            .HasForeignKey(c => c.sellerId)
            //user delete cart delete too
            .OnDelete(DeleteBehavior.Restrict);


        // Set up relationship between `Cart` and `Ticket`
        modelBuilder.Entity<Cart>()
            .HasOne(c => c.Tickets)
            .WithMany()
            .HasForeignKey(c => c.ticketId)
            //cart delete but ticket not
            .OnDelete(DeleteBehavior.Restrict);

        // Set up the relationship between `MessageData` and `Message`
        modelBuilder.Entity<MessageData>()
            .HasOne(md => md.Message)
            .WithMany(m => m.Messages)
            .HasForeignKey(md => md.messageId)
            //Message delete message data delete too
            .OnDelete(DeleteBehavior.Cascade);

        // Set up the relationship between `Wallet` and `MainUser`
        modelBuilder.Entity<Wallet>()
            .HasOne(c => c.User)
            .WithMany(cd => cd.Wallets)
            .HasForeignKey(c => c.userId)
            //user is delete wallet delete
            .OnDelete(DeleteBehavior.Cascade);

        //Set up the relationship between `Transaction` and `Wallet`
        modelBuilder.Entity<Transaction>()
             .HasOne(t => t.Wallets)
             .WithMany(w => w.Transactions)
             .HasForeignKey(t => t.walletId)
            //wallet delete but transaction not
            .OnDelete(DeleteBehavior.Restrict);
    }


}



