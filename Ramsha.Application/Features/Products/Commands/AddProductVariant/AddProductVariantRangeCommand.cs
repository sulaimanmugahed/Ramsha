
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Ramsha.Application.Features.Products.Commands.AddProductVariant;

public class AddProductVariantRangeCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public List<VariantCommand> Variants { get; set; }
}

