using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts;
public interface ICookieService
{
	void SetCookieValue(string key, string value, CookieOptions? options = null);
	string? GetCookieValue(string key);
	void RemoveCookie(string key);
}
