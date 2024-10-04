using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Infrastructure.Extensions;

public static class BaseResultExtensions
{
	public static ActionResult ToActionResult(this BaseResult result)
	{
		if (result.Success)
		{
			return new OkResult();
		}

		if (result.Errors != null && result.Errors.Count > 0)
		{
			var firstError = result.Errors.First();

			return firstError.ErrorCode switch
			{
				ErrorCode.NotFound => new NotFoundObjectResult(result),
				ErrorCode.AccessDenied => new UnauthorizedObjectResult(result),
				_ => new BadRequestObjectResult(result)
			};
		}
		return new BadRequestResult();
	}

	public static ActionResult ToActionResult<TData>(this BaseResult<TData> result)
	{
		if (result.Success)
		{
			return new OkObjectResult(result);
		}

		if (result.Errors != null && result.Errors.Count > 0)
		{
			var firstError = result.Errors.First();

			return firstError.ErrorCode switch
			{
				ErrorCode.NotFound => new NotFoundObjectResult(result),
				ErrorCode.AccessDenied => new UnauthorizedObjectResult(result),
				_ => new BadRequestObjectResult(result)
			};
		}

		return new BadRequestResult();
	}
}