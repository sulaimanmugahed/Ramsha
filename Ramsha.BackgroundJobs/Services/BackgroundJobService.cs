using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.BackgroundJobs.Extensions;

namespace Ramsha.BackgroundJobs.Services;


public class BackgroundJobService(ILogger<BackgroundJobService> _logger) : IBackgroundJobService
{
    public void Enqueue(Expression<Action> methodCall)
    {
        BackgroundJob.Enqueue(methodCall);
    }

    public void Schedule(Expression<Action> methodCall, TimeSpan delay)
    {
        BackgroundJob.Schedule(methodCall, delay);
    }
    public string StartJob<T>(Expression<Action<T>> methodCall)
    {
        try
        {
            var jobId = BackgroundJob.Enqueue(methodCall);
            _logger.LogInformation("Enqueued job with ID: {JobId}", jobId);
            return jobId;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to enqueue job.");
            throw;
        }
    }

    public string ScheduleJob<T>(Expression<Action<T>> methodCall, TimeSpan delay)
    {
        try
        {
            var jobId = BackgroundJob.Schedule(methodCall, delay);
            _logger.LogInformation("Scheduled job with ID: {JobId} for {Delay}", jobId, delay);
            return jobId;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to schedule job.");
            throw;
        }
    }

    public void RecurringJob<T>(string jobId, Expression<Action<T>> methodCall, ApplicationCorn cronExpression)
    {
        try
        {
            Hangfire.RecurringJob.AddOrUpdate(jobId, methodCall, CronExpressionHelper.GetCronExpression(cronExpression));
            _logger.LogInformation("Recurring job created/updated with ID: {JobId} and Cron: {CronExpression}", jobId, cronExpression);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create/update recurring job.");
            throw;
        }
    }

    public bool DeleteJob(string jobId)
    {
        try
        {
            var deleted = BackgroundJob.Delete(jobId);
            _logger.LogInformation("Deleted job with ID: {JobId}. Success: {Deleted}", jobId, deleted);
            return deleted;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete job with ID: {JobId}.", jobId);
            throw;
        }
    }

}


