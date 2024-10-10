<<<<<<< HEAD
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
=======
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : IdentityDbContext<IdentityUser>
>>>>>>> 40f0f891907ad5328634aa68c2ac3176b7dfc637
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
}
