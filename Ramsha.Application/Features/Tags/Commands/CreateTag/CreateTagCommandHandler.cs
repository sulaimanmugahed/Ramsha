using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Tags.Commands.CreateTag;

public class CreateTagCommandHandler(
    ITagRepository tagRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateTagCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateTagCommand request, CancellationToken cancellationToken)
    {
        var tag = Tag.Create(request.Name);

        await tagRepository.AddAsync(tag);

        await unitOfWork.SaveChangesAsync();

        return tag.Id.Value.ToString();
    }
}
