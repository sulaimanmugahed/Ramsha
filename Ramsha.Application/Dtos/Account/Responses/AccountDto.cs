﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Account.Responses;
public record AccountDto(
	Guid Id,
string Username,
string Email
);
