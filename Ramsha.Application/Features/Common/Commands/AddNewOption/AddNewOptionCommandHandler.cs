using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using MediatR;

namespace Ramsha.Application.Features.Common.Commands.AddNewOption;

public class AddNewOptionCommandHandler(
    IOptionRepository optionRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<AddNewOptionCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(AddNewOptionCommand request, CancellationToken cancellationToken)
    {
        var option = Option.Create(request.OptionName);
        option.AddValues(request.OptionValues);

        await optionRepository.AddAsync(option);

        await unitOfWork.SaveChangesAsync();

        return option.Id.Value.ToString();
    }
}
