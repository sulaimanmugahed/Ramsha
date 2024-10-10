using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Inventory.Commands.ApplyInventoryItemDiscount;

public class ApplyInventoryItemDiscountCommand : IRequest<BaseResult>
{
    public string Sku { get; set; }
    public decimal DiscountValue { get; set; }
    public DateTime StartData { get; set; }
    public DateTime EndData { get; set; }
    public DiscountType DiscountType { get; set; }
}
