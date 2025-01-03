using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.BackgroundJobs;

public interface IBackgroundJobService
{
    void Enqueue(Expression<Action> methodCall);
    void Schedule(Expression<Action> methodCall, TimeSpan delay);
}
