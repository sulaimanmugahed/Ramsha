using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Dtos.Admins;
using Ramsha.Application.Features.Admin.Commands.CreateAdmin;
using Ramsha.Application.Features.Admin.Queries.GetAdmins;
using Ramsha.Application.Wrappers;


namespace Ramsha.Api.Controllers.v1;


class Test
{
    public int Id { get; set; }
    public string Name { get; set; }

}

[ApiVersion("1.0")]

public class AdminsController(IRedisCacheService redisCacheService) : BaseApiController
{
    [HttpGet(nameof(Test))]
    public async Task<IActionResult> Test()
    {
        var hashKey = "hash";
        var testData = new List<Test>([
            new Test{
                Id=1,
                Name="Test 1"
            },
             new Test{
                Id=2,
                Name="Test 2"
            },
            ]);

        await redisCacheService.SetHash(hashKey, testData, x => x.Id, TimeSpan.FromMinutes(10));
        var cached = await redisCacheService.GetHash<Test>(hashKey);
        return Ok(cached);
    }

    [HttpGet]
    public async Task<BaseResult<List<AdminDto>>> Get()
    => await Mediator.Send(new GetAdminsQuery());

    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateAdminCommand command)
    => await Mediator.Send(command);
}
