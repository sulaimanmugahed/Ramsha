

using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplierProduct;

public class AddSupplierProductCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }

}
