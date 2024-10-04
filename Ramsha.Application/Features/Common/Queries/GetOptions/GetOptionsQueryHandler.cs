
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Common.Queries.GetOption;

public class GetOptionsQueryHandler(IOptionRepository optionRepository)
 : IRequestHandler<GetOptionsQuery, BaseResult<List<OptionDto?>>>
{
    public async Task<BaseResult<List<OptionDto?>>> Handle(GetOptionsQuery request, CancellationToken cancellationToken)
    {
        var options = await optionRepository.GetAllWithIncludeAsync(
            x => x.OptionValues);

        return options.Select(x => x?.AsDto()).ToList();
    }
}
