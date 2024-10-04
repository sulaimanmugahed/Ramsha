using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Wrappers;
using MediatR;


namespace Ramsha.Application.Features.Account.Commands.RefreshToken;
public class RefreshCommand : IRequest<BaseResult<AuthenticatedUserDto?>>
{
}
