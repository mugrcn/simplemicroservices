using System.Reflection;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Play.Common.Settings;

namespace Play.Common.MassTransit;

public static class Extensions
{
    public static IServiceCollection AddMassTransitWithRabbitMQ(this IServiceCollection services)
    {
        services.AddMassTransit(busRegConfigurator =>
        {
            busRegConfigurator.AddConsumers(Assembly.GetEntryAssembly());

            busRegConfigurator.UsingRabbitMq((context, configurator) =>
            {
                var configuration = context.GetService<IConfiguration>();
                var rabbitMQSettings = configuration.GetSection(nameof(RabbitMQSettings)).Get<RabbitMQSettings>();
                var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
                var rabbitHost = Environment.GetEnvironmentVariable("RABBITMQ_HOST")
                 ?? rabbitMQSettings.Host;
                configurator.Host(rabbitHost);
                configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(serviceSettings.ServiceName, false));
                configurator.UseMessageRetry(retryConfigurator =>
                {
                    retryConfigurator.Interval(3, 5);
                });
            });
        });

        return services;
    }
}