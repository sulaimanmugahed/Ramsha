using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualBasic;
using System.Net;

namespace Ramsha.Api.Infrastructure.Filters;

public class ApiResultFilterAttribute : ActionFilterAttribute
{
	public override void OnResultExecuting(ResultExecutingContext context)
	{
		var statusDec = new Dictionary<ErrorCode, HttpStatusCode>()
		{
			{ ErrorCode.ModelStateNotValid, HttpStatusCode.BadRequest },
			{ ErrorCode.NotFound, HttpStatusCode.NotFound },
			{ ErrorCode.AccessDenied, HttpStatusCode.Forbidden},
		};

		if (context.Result is BadRequestObjectResult badRequestObjectResult)
		{
			var responseModel = BaseResult.Failure();
			foreach (var item in ((ValidationProblemDetails)badRequestObjectResult.Value).Errors)
			{
				foreach (var value in item.Value)
				{
					responseModel.AddError(new Error(ErrorCode.ModelStateNotValid, value, item.Key));
				}
			}
			context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
			context.Result = new JsonResult(responseModel);
		}
		else if (context.Result is ObjectResult objectResult && objectResult.Value is BaseResult baseResult && baseResult.Errors is not null)
		{
			var status = baseResult.Errors[0].ErrorCode;
			if (statusDec.TryGetValue(status, out HttpStatusCode httpStatus))
			{
				context.HttpContext.Response.StatusCode = (int)httpStatus;
			}
			else
			{
				context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
			}
			context.Result = new JsonResult(baseResult);
		}
	}
}
