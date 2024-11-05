using MediatR;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;


namespace Ramsha.Application.Features.Account.Commands.UpdateAddress;

public class UpdateAddressCommand : Address,IRequest<BaseResult>
{
  
}
