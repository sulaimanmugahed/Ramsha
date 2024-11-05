
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class FulfillmentRequestRepository(ApplicationDbContext context)
 : GenericRepository<FulfillmentRequest, FulfillmentRequestId>(context), IFulfillmentRequestRepository
{

}
