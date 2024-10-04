using System.Net.Mail;
using System.Net;
using Ramsha.Mail.Models;
using Ramsha.Application.Contracts;
using Microsoft.Extensions.Options;

namespace Ramsha.Mail.Services;
public class EmailService(IOptionsSnapshot<EmailSettings> emailSettings) : IEmailService
{
	public Task SendEmail(string toEmail, string subject, string body)
	{
		// Set up SMTP client
		SmtpClient client = new(emailSettings.Value.SmtpServer, emailSettings.Value.Port);
		client.EnableSsl = true;
		client.UseDefaultCredentials = false;
		client.Credentials = new NetworkCredential(emailSettings.Value.UserName, emailSettings.Value.Password);

		// Create email message
		MailMessage mailMessage = new MailMessage();
		mailMessage.From = new MailAddress(emailSettings.Value.From);
		mailMessage.To.Add(toEmail);
		mailMessage.Subject = subject;
		mailMessage.IsBodyHtml = true;
		mailMessage.Body = body;

		// Send email
		return client.SendMailAsync(mailMessage);
	}
}
