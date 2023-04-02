﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Persistence.Extensions;

public static class ServiceScopeExtensions
{
    public static async Task<IServiceScope> UseDatabaseSetup(this IServiceScope scope, ILogger logger)
    {
        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        try
        {
            await context.Database.MigrateAsync();
        }
        catch (Exception e)
        {
            logger.LogWarning(e, "An error occurred while migrating the database.");
        }

        try
        {
            await DataSeed.EnsureSeeded(context);
        }
        catch (Exception e)
        {
            logger.LogWarning(e, "An error occurred while seeding the database.");
        }

        return scope;
    }
}