using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Commands.AddItem;
public class AddItemToBasketCommand : IRequest<BaseResult<BasketDto>>
{
    public Guid ProductId { get; set; }
    public string InventorySku { get; set; }
    public int Quantity { get; set; }
}
