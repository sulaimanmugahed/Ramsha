
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.UpdateCategory;

public class UpdateCategoryCommand : IRequest<BaseResult>
{
    public Guid Id { get; set; }

    public string Name { get; set; }

}
