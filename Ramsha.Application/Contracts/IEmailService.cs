
using Ramsha.Application.Contracts.Email;

namespace Ramsha.Application.Contracts;
public interface IEmailService
{
	Task SendEmailMessage(EmailMessage emailMessage);
}
