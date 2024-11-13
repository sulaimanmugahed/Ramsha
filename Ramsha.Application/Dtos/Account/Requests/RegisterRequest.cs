using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Dtos.Account.Requests;
public class RegisterRequest
{
	public string Username { get; set; }
	public string Email { get; set; }
	public string Password { get; set; }
    public CurrencyCode PreferredCurrency { get; set; }

}
