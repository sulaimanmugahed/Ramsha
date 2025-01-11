using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Tags.Commands.DeleteTag;

public class DeleteTagCommandHandler(
        ITagRepository tagRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteTagCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
    {
        var existTag = await tagRepository.GetByIdAsync(new TagId(request.Id));
        if (existTag is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no tag with this id");

        tagRepository.Delete(existTag);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
