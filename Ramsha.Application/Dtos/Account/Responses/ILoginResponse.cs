using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Account.Responses;

[JsonDerivedType(typeof(AuthenticatedCustomerDto))]
[JsonDerivedType(typeof(AuthenticatedSupplierDto))]
public interface ILoginResponse
{
	public string Username { get; set; }
	public string Email { get; set; }
	public string Role { get; set; }
	public bool IsVerified { get; set; }
	public string AccessToken { get; set; }
	public DateTime RefreshTokenExpiration { get; set; }

}
