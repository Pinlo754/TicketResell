namespace TicketResell_API.Controllers.CommentController.Model
{
    public class Comment
    {
        public string? userId { get; set; }
        public string? commentId { get; set;}
        public int? rating { get; set; }
        public DateTime? time { get; set; }
        public string? comment {  get; set; }
        public string? orderId { get; set; }
        public string? toUserId { get; set; }

    }
}
