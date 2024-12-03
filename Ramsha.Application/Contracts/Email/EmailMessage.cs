using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Email;

public record EmailMessage(
    List<string> To,
    string Subject,
    string Body
);

