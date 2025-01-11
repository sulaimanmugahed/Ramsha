using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Ramsha.BackgroundJobs.Extensions;

public static class JobExecutor
{
    public static async Task ExecuteJob<T>(Func<T, Task> methodCall, IServiceProvider serviceProvider) where T : class
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var service = scope.ServiceProvider.GetRequiredService<T>();
            await methodCall(service);
        }
    }
}
