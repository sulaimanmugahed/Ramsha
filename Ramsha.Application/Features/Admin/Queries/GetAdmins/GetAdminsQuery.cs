using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Admins;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Admin.Queries.GetAdmins;

public class GetAdminsQuery : IRequest<BaseResult<List<AdminDto>>>
{

}
