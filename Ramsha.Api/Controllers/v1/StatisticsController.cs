using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Statistics;
using Ramsha.Application.Features.Statistics.Queries.GetAdminStatistics;
using Ramsha.Application.Features.Statistics.Queries.GetSupplierStatistics;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Enums;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class StatisticsController() : BaseApiController
{
    [HttpGet("supplier")]
    public async Task<BaseResult<SupplierStatistics>> GetSupplierStatistics()
    => await Mediator.Send(new GetSupplierStatisticsQuery());

    [HttpGet("admin")]
    public async Task<BaseResult<AdminStatistics>> GetAdminStatistics()
  => await Mediator.Send(new GetAdminStatisticsQuery());


}



