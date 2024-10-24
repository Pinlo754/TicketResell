namespace TicketResell_API.Controllers.User.Model
{
    public class MomoPayment
    {
        public string PartnerCode { get; set; }
        public string PartnerName { get; set; }
        public string StoreId { get; set; }
        public string RequestId { get; set; }
        public string Amount { get; set; }
        public string OrderId { get; set; }
        public string OrderInfo { get; set; }
        public string ReturnUrl { get; set; }
        public string NotifyUrl { get; set; }
        public string ExtraData { get; set; }
        public string Signature { get; set; }
    }
}
