using Ramsha.Api.Infrastructure.Filters;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers;


[ApiController]
[ApiResultFilter]
[Route("api/v{version:apiVersion}/[controller]")]
public class BaseApiController : ControllerBase
{
	private IMediator _mediator;
	protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}
