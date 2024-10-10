<<<<<<< HEAD
using Microsoft.EntityFrameworkCore;
=======
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
>>>>>>> 40f0f891907ad5328634aa68c2ac3176b7dfc637

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
<<<<<<< HEAD

=======
//Add db context
>>>>>>> 40f0f891907ad5328634aa68c2ac3176b7dfc637
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

<<<<<<< HEAD
=======
//add identity 
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

//Set up JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

//Establish authorization policies
builder.Services.AddAuthorization(Options =>
{
    Options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin"));
    Options.AddPolicy("StaffPolicy", policy => policy.RequireRole("Staff"));
    Options.AddPolicy("UserPolicy", policy => policy.RequireRole("User"));
});


    



>>>>>>> 40f0f891907ad5328634aa68c2ac3176b7dfc637
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "API for managing products",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Pinlo",
            Email = "your-email@example.com",
            Url = new Uri("https://example.com")
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty;
    });
}


<<<<<<< HEAD

app.MapControllers();
app.Run();
=======
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

>>>>>>> 40f0f891907ad5328634aa68c2ac3176b7dfc637
