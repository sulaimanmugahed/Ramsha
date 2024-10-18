using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Products;

public record ProductOptionCommand(
    Guid Value,
    int Priority
    );

public record ProductOptionDto(
    Guid Id,
    string Name,
    int Priority
    );


