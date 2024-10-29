
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Features.Orders.Commands.CreateOrder;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
[Authorize(Roles = Roles.Customer)]
public class OrdersController : BaseApiController
{
    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateOrderCommand createOrderCommand)
    => await Mediator.Send(createOrderCommand);
}
