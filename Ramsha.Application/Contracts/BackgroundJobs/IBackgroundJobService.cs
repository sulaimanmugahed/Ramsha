using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Application.Constants;

namespace Ramsha.Application.Contracts.BackgroundJobs;

public interface IBackgroundJobService
{
    void Enqueue(Expression<Action> methodCall);
    void Schedule(Expression<Action> methodCall, TimeSpan delay);

    string StartJob<T>(Expression<Action<T>> methodCall);
    string ScheduleJob<T>(Expression<Action<T>> methodCall, TimeSpan delay);
    void RecurringJob<T>(string jobId, Expression<Action<T>> methodCall, ApplicationCorn cronExpression);
    bool DeleteJob(string jobId);
}
