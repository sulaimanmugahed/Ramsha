using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Suppliers;

public record SupplyRequestItemDto(
Guid Id,
Guid ProductId,
string SKU,
int Quantity,
decimal WholesalePrice
);




