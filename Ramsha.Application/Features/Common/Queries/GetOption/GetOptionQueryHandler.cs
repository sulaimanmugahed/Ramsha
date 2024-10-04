using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Queries.GetOption;

public class GetOptionQueryHandler(IOptionRepository optionRepository)
 : IRequestHandler<GetOptionQuery, BaseResult<OptionDto?>>
{
    public async Task<BaseResult<OptionDto?>> Handle(GetOptionQuery request, CancellationToken cancellationToken)
    {
        var option = await optionRepository.GetAsync(
            x => x.Id.Value == request.Id,
            x => x.OptionValues);

        return option?.AsDto();
    }
}
