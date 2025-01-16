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

/// <summary>
/// Manages statistics-related operations.
/// </summary>
[ApiVersion("1.0")]
public class StatisticsController() : BaseApiController
{
  /// <summary>
  /// Retrieves statistics for currently supplier.
  /// </summary>
  /// <remarks>
  /// This endpoint returns statistics relevant to currently supplier.
  /// </remarks>
  [HttpGet("supplier")]
  public async Task<BaseResult<SupplierStatistics>> GetSupplierStatistics()
      => await Mediator.Send(new GetSupplierStatisticsQuery());

  /// <summary>
  /// Retrieves statistics for administrators.
  /// </summary>
  /// <remarks>
  /// This endpoint returns high-level and global statistics for administrators.
  /// </remarks>
  [HttpGet("admin")]
  public async Task<BaseResult<AdminStatistics>> GetAdminStatistics()
      => await Mediator.Send(new GetAdminStatisticsQuery());
}