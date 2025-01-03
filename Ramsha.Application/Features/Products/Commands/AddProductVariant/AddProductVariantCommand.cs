
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductVariant;

public class AddProductVariantCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public string? ImageUrl { get; set; }
    public decimal Length { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public decimal Weight { get; private set; }
    public List<VariantValuesCommand> VariantValues { get; set; }
}
