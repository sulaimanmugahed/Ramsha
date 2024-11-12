using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common;

namespace Ramsha.Application.Contracts.Persistence;

public interface ICurrencyRateRepository : IGenericRepository<CurrencyRate, int>
{

}

