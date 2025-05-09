namespace FlightBooking.Services
{
    using System.Net;
    using System.Net.Mail;
    using Microsoft.Extensions.Configuration;

    public interface IEmailService
    {
        void SendEmail(string to, string subject, string body);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(string to, string subject, string body)
        {
            var smtp = _config.GetSection("SmtpSettings");

            var client = new SmtpClient(smtp["Host"])
            {
                Port = int.Parse(smtp["Port"]!),
                Credentials = new NetworkCredential(smtp["Username"], smtp["Password"]),
                EnableSsl = bool.Parse(smtp["EnableSsl"]!)
            };

            var mail = new MailMessage
            {
                From = new MailAddress(smtp["Username"]!),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };
            mail.To.Add(to);

            client.Send(mail);
        }
    }

}
