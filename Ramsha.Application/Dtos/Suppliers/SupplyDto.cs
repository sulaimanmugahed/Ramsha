using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Suppliers;




public record SupplyDto(
     Guid Id,
    List<SupplyItemDto> Items,
    string Status
);

public record SupplyItemDto(
Guid Id,
Guid ProductId,
string Name,
string SKU,
int Quantity,
decimal WholesalePrice
);

