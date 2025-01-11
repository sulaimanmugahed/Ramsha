using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Tags.Commands.UpdateTag;

public class UpdateTagCommandHandler(
    ITagRepository tagRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateTagCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateTagCommand request, CancellationToken cancellationToken)
    {
        var existTag = await tagRepository.GetByIdAsync(new TagId(request.Id));
        if (existTag is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no tag with this id");

        existTag.Update(request.Name);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
