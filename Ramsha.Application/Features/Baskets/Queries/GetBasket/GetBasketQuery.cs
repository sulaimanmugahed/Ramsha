using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Baskets.Queries.GetBasket;
public class GetBasketQuery : IRequest<BaseResult<BasketDto?>>
{
    
}
