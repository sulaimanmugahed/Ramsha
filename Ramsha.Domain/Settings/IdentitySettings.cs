﻿namespace Ramsha.Domain.Settings;

public class IdentitySettings
{
    public bool PasswordRequireDigit { get; set; }
    public int PasswordRequiredLength { get; set; }
    public bool PasswordRequireNonAlphanumic { get; set; }
    public bool PasswordRequireUppercase { get; set; }
    public bool PasswordRequireLowercase { get; set; }
    public bool RequireUniqueEmail { get; set; }
    public bool RequireConfirmedEmail { get; set; }
    public bool RequireConfirmedAccount  { get; set; }
}

