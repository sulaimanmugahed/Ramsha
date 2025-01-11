using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Statistics;

public record SalesPerformance(
    string Month,
    decimal Revenue
);

