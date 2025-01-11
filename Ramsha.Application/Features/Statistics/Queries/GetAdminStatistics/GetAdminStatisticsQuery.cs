using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Statistics;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Statistics.Queries.GetAdminStatistics;

public class GetAdminStatisticsQuery : IRequest<BaseResult<AdminStatistics>>
{

}
