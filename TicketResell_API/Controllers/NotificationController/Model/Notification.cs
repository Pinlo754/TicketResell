namespace TicketResell_API.Controllers.NotificationController.Model;
public partial class Notification{
    public string notificationId { get; set; }
    public string notiContent { get; set; }
    public string notiType { get; set; }
    public string toUserId { get; set; }
}