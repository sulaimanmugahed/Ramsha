using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Commands.Create;
public class CreateBasketCommand:IRequest<BaseResult<BasketDto>>
{
}
