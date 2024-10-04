using Ramsha.Application.Contracts;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Account.Queries;
public class TestQueryHandler(ICookieService cookieService) : IRequestHandler<TestQuery, BaseResult<string>>
{
	public async Task<BaseResult<string>> Handle(TestQuery request, CancellationToken cancellationToken)
	{
		var value = cookieService.GetCookieValue("test");

		return value;
	}
}
