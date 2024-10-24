

using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplierVariant;

public class AddSupplierVariantCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public Guid ProductVariantId { get; set; }
}
