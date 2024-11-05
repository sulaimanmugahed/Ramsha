using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Domain.Common;
using System;
using System.Text.Json.Serialization;

namespace Ramsha.Application.DTOs.Account.Responses
{
	[JsonDerivedType(typeof(AuthenticatedCustomerDto))]
	[JsonDerivedType(typeof(AuthenticatedSupplierDto))]
	public class AuthenticatedUserDto
	{
		public string Username { get; set; }
		public string Email { get; set; }
		public string Role { get; set; }
		public bool IsVerified { get; set; }
		public string AccessToken { get; set; }
		public DateTime RefreshTokenExpiration { get; set; }
		public Address? Address { get; set; }
	}
}
