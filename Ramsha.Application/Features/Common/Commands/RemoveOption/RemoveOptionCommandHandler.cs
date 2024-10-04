using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Commands.RemoveOption;

public class RemoveOptionCommandHandler(
    IOptionRepository optionRepository,
    IProductRepository productRepository,
    IUnitOfWork unitOfWork)
 : IRequestHandler<RemoveOptionCommand, BaseResult>
{
    public async Task<BaseResult> Handle(RemoveOptionCommand request, CancellationToken cancellationToken)
    {
        var optionId = new Domain.Products.OptionId(request.OptionId);

        var option = await optionRepository.GetByIdAsync(optionId);
        if (option is null)
            return new Error(ErrorCode.EmptyData, "No option found");

        var exist = await productRepository.IsOptionExist(optionId);
        if (exist)
            return new Error(ErrorCode.ModelStateNotValid, "There are some variants take this option");

        optionRepository.Delete(option);
        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();
    }
}
