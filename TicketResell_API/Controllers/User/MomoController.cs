using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.User.Service;

namespace TicketResell_API.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class MomoController : ControllerBase
    {
        private readonly IMomoPaymentService _momoPaymentService;
        private readonly MomoSetting _momoSetting;

        public MomoController(IMomoPaymentService momoPaymentService,MomoSetting momoSetting)
        {
            _momoPaymentService = momoPaymentService;
            _momoSetting = momoSetting;
        }

        [HttpPost("create-payment")]
        public async Task<IActionResult> CreatePayment([FromBody] MomoPayment model)
        {
            if (model == null || string.IsNullOrEmpty(model.Amount) || string.IsNullOrEmpty(model.OrderInfo))
            {
                return BadRequest("Invalid payment information");
            }
            var partnerCode = model.PartnerCode; 
            var accessKey = _momoSetting.AccessKey; 
            var secretKey = _momoSetting.SecretKey; 
            var orderId = Guid.NewGuid().ToString(); 
            var requestId = Guid.NewGuid().ToString(); 
            var returnUrl = model.ReturnUrl; 
            var notifyUrl = model.NotifyUrl; 
            var amount = model.Amount; 
            var extraData = model.ExtraData ?? ""; 

            var signature = await _momoPaymentService.GenerateSignatureAsync
            (
                partnerCode, accessKey, requestId, orderId, model.OrderInfo, returnUrl, 
                notifyUrl, amount, extraData, secretKey
            );

            var paymentRequest = new
            {
                partnerCode,
                accessKey,
                requestId,
                orderId,
                amount,
                orderInfo = model.OrderInfo,
                returnUrl,
                notifyUrl,
                extraData,
                signature
            };

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.PostAsync("https://test-payment.momo.vn/v2/gateway/api/create",
                    new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return Ok(result); // Trả về kết quả từ Momo
                }
                else
                {
                    return BadRequest("Error while making payment");
                }
            }
        }

        [HttpPost("notify")]
        public async Task<IActionResult> Notify([FromBody] MomoPayment model)
        {
            if (model == null)
            {
                return BadRequest("Invalid information");
            }

            var expectedSignature = await _momoPaymentService.GenerateSignatureAsync
            (
                model.PartnerCode,
                model.PartnerName,
                model.RequestId,
                model.OrderId,
                model.OrderInfo,
                model.ReturnUrl,
                model.NotifyUrl,
                model.Amount,
                model.ExtraData,
                _momoSetting.SecretKey
            );

            if (expectedSignature != model.Signature)
            {
                return Unauthorized("Invalid signature");
            }
            return Ok("Received notification successfully");
        }
    }
}
