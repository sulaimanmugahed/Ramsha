using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using Ramsha.Application.Constants;

namespace Ramsha.BackgroundJobs.Extensions;

public static class CronExpressionHelper
{
    public static string GetCronExpression(ApplicationCorn ApplicationCorn)
    {
        switch (ApplicationCorn)
        {
            case ApplicationCorn.Minutely:
                return Cron.Minutely();
            case ApplicationCorn.Hourly:
                return Cron.Hourly(0);  // default minute to 0
            case ApplicationCorn.Daily:
                return Cron.Daily(0, 0);  // default to 00:00
            case ApplicationCorn.Weekly:
                return Cron.Weekly(DayOfWeek.Monday, 0, 0);  // default to Monday at 00:00
            case ApplicationCorn.Monthly:
                return Cron.Monthly(1, 0, 0);  // default to the first day of the month at 00:00
            case ApplicationCorn.Yearly:
                return Cron.Yearly(1, 1, 0, 0);  // default to Jan 1st at 00:00
            default:
                throw new ArgumentException("Invalid cron type");
        }
    }
}

