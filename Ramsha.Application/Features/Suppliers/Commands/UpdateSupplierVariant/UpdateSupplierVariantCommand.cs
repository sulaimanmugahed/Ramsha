
using MediatR;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.UpdateSupplierVariant;

public class UpdateSupplierVariantCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public Guid VariantId { get; set; }
    public string? Description { get; set; }
    public decimal? WholesalePrice { get; set; }
    public List<ImageRequest> VariantImagesToAdd { get; set; } = [];
    public List<string> VariantImagesUrlToRemove { get; set; } = [];
}
