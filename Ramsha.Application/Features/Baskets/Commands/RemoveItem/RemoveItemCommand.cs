using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Commands.RemoveItem;
public class RemoveItemCommand : IRequest<BaseResult>
{
    public Guid InventoryItemId { get; set; }
    public int Quantity { get; set; }

}
