namespace TicketResell_API.Controllers.User.Service
{
    public interface IMomoPaymentService
    {
        Task<string> GenerateSignatureAsync(string partnerCode, string partnerName, string requestId, string orderId,
        string orderInfo, string returnUrl, string notifyUrl, string amount, string extraData, string secretKey);
    }
}
