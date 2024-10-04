﻿using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Ramsha.Application.DTOs.Account.Responses
{
    public class AuthenticationResult
    {
        public Guid AccountId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsVerified { get; set; }
        public string AccessToken { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}