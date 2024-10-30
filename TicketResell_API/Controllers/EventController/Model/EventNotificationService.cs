using Humanizer.Bytes;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Runtime.Intrinsics.X86;
using TicketResell_API.Controllers.Service;

namespace TicketResell_API.Controllers.EventController.Model
{
    public class EventNotificationService :BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IEmailSender _emailSender;

        public EventNotificationService(IEmailSender emailSender, IServiceProvider serviceProvider)
        {
            _emailSender = emailSender;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    var upcomingTime = DateTime.Now.AddHours(7);
                    var currentTime = DateTime.Now;

                    var upcomingEvents = context.Events
                        .Where(e => e.eventTime >= currentTime && e.eventTime <= upcomingTime)
                        .ToList();
                    //Browse all events in the upcomingEvents list
                    foreach (var eventItem in upcomingEvents)
                    {
                        //take all user from table Users
                        var users = context.Users.ToList();
                        //Use a foreach loop to iterate through the list of users.
                        foreach (var user in users)
                        {
                            //send email to all user
                            await _emailSender.SendUpcomingEventEmailAsync(user.Email, eventItem);
                        }
                    }
                }
                
                // Check every 30 minutes
                await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken);
            }
        }
    }
}
