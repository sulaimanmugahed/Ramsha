using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Hangfire;
using Ramsha.Application.Contracts.BackgroundJobs;

namespace Ramsha.BackgroundJobs.Services;


public class BackgroundJobService : IBackgroundJobService
{
    public void Enqueue(Expression<Action> methodCall)
    {
        BackgroundJob.Enqueue(methodCall);
    }

    public void Schedule(Expression<Action> methodCall, TimeSpan delay)
    {
        BackgroundJob.Schedule(methodCall, delay);
    }
}


