
using Ramsha.Mail.Models;
using Ramsha.Application.Contracts;
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts.Email;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;

namespace Ramsha.Mail.Services;
public class EmailService(IOptionsSnapshot<EmailSettings> emailSettings) : IEmailService
{

	public async Task SendEmailMessage(EmailMessage emailMessage)
	{
		var mailMessage = CreateEmailMessage(emailMessage);
		await SendAsync(mailMessage);
	}

	private MimeMessage CreateEmailMessage(EmailMessage emailMessage)
	{
		var message = new MimeMessage();
		message.From.Add(new MailboxAddress("", emailSettings.Value.From));
		foreach (var to in emailMessage.To)
		{
			message.To.Add(new MailboxAddress("", to));
		}
		message.Subject = emailMessage.Subject;
		message.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailMessage.Body };
		return message;
	}

	private async Task SendAsync(MimeMessage mailMessage)
	{
		using (var client = new SmtpClient())
		{
			try
			{
				await client.ConnectAsync(emailSettings.Value.SmtpServer, emailSettings.Value.Port, true);
				client.AuthenticationMechanisms.Remove("XOAUTH2");
				await client.AuthenticateAsync(emailSettings.Value.UserName, emailSettings.Value.Password);
				await client.SendAsync(mailMessage);
			}
			catch
			{
				throw;
			}
			finally
			{
				await client.DisconnectAsync(true);
				client.Dispose();
			}
		}
	}

}
