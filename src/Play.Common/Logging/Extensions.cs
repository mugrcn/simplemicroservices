using System;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Play.Common.Logging;


public static class LoggingExtensions
{
    public static IHostBuilder UseSerilogWithDefaults(this IHostBuilder builder)
    {
        builder.UseSerilog((context, services, configuration) =>
        {
            configuration
                .ReadFrom.Configuration(context.Configuration) // appsettings.json & env vars
                .Enrich.With(new LogLevelEnricher())           // custom LogLevel property
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("Application", context.HostingEnvironment.ApplicationName);
        });

        return builder;
    }
}
