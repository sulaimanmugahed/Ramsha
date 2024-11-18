using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Inventory.Commands.ApplyInventoryItemDiscount;

public class ApplyInventoryItemDiscountCommand : IRequest<BaseResult>
{
    public Guid InventoryItemId { get; set; }
    public DiscountRequest Discount { get; set; }
}
