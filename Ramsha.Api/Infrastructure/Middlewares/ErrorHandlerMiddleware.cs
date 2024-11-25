using Ramsha.Application.Exceptions;
using Ramsha.Application.Wrappers;
using System.Net;
using System.Text.Json;


namespace Ramsha.Api.Infrastructure.Middlewares;

public class ErrorHandlerMiddleware(RequestDelegate next)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            var responseModel = BaseResult.Failure();


            //here add ur custom exceptions to catch and map them to baseResponse
            switch (exception)
            {
                case ApplicationNotFoundException ex:
                    response.StatusCode = (int)HttpStatusCode.NotFound;
                    responseModel.AddError(new Error(ErrorCode.NotFound, ex.Message, ex.FieldName ?? string.Empty));
                    break;

                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    responseModel.AddError(new Error(ErrorCode.Exception, exception.Message));
                    break;
            }
            var result = JsonSerializer.Serialize(responseModel,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

            await response.WriteAsync(result);
        }
    }
}

public static class ErrorHandlerMiddlewareExtension
{
    public static IApplicationBuilder UseErrorHandlerMiddleware(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ErrorHandlerMiddleware>();
    }
}
