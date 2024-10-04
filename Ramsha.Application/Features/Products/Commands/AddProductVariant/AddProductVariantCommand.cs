
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductVariant;

public class AddProductVariantCommand: IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? BasePrice { get; set; }

    public List<VariantValuesCommand> VariantValues { get; set; }
    public List<ImageRequest> VariantImages { get; set; }


}
