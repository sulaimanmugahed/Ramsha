using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Mail.Models;
public class EmailSettings
{
	public string From { get; set; }
	public string SmtpServer { get; set; }
	public int Port { get; set; }
	public string UserName { get; set; }
	public string Password { get; set; }
}
