using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts;
public interface IEmailService
{
	Task SendEmail(string toEmail, string subject, string body);
}
