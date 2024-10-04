using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Queries.GetBasket;
public class GetBasketQuery:IRequest<BaseResult<BasketDto>>
{
}
