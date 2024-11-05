using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface IFulfillmentRequestRepository : IGenericRepository<FulfillmentRequest, FulfillmentRequestId>
{

}
