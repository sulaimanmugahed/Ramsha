using Ramsha.Application.Contracts;
using Ramsha.Mail.Models;
using Ramsha.Mail.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Ramsha.Mail;
public static class RegisterServices
{
	public static IServiceCollection AddEmailServices(this IServiceCollection services, IConfiguration configuration)
	{
		services.Configure<EmailSettings>(configuration.GetSection(nameof(EmailSettings)));

		return services.AddTransient<IEmailService, EmailService>();
	}
}
