using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Customers;
public record CustomerDto(
    Guid Id,
    string FirstName,
     string LastName,
     string Username
);