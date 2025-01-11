using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class TestsController : BaseApiController
{
    [HttpGet]
    public IActionResult Test() => Ok("Welcome");
}
