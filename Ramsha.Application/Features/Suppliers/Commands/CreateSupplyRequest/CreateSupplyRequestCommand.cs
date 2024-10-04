
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Enums;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.CreateSupplyRequest;

public class CreateSupplyRequestCommand : IRequest<BaseResult<string?>>
{
    public Currency Currency { get; set; }
}
