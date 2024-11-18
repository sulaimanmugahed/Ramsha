using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Settings;

public class StripeSettings
{
    public string SecretKey { get; set; }
    public string PublicKey { get; set; }
    public string WhSecretKey { get; set; }

}
