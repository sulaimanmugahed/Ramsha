
using Azure;
using FluentValidation;
using Ramsha.Application.Wrappers;
using System.Net;


namespace Ramsha.Api.Infrastructure.Filters;

public class ValidationFilter<T> : IEndpointFilter
{

	// this filter catch the FluentValidation error and map them to the base Response
	public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var validator = context.HttpContext.RequestServices.GetService<IValidator<T>>();
        if (validator is not null)
        {
            var entity = context.Arguments
                .OfType<T>()
                .FirstOrDefault(x => x?.GetType() == typeof(T));
            if (entity is not null)
            {
                var validation = await validator.ValidateAsync(entity);
                if (validation.IsValid)
                    return await next(context);

                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                var responseModel = new BaseResult();
                responseModel.Success = false;
                foreach (var item in validation.ToDictionary())
                {
                    foreach (var val in item.Value)
                    {
                        responseModel.Errors ??= [];
                        responseModel.Errors.Add(
                        new Error(ErrorCode.ModelStateNotValid,
                        val,
                        item.Key));
                    }
                }
                return responseModel;
            }
            else
                return Results.Problem("Something went wrong");
        }
        return await next(context);
    }
}
