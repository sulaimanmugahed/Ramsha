using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Constants;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Admin.Commands.CreateAdmin;

public class CreateAdminCommand : IRequest<BaseResult<string>>
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public List<PermissionType> Permissions { get; set; } = [];
}
