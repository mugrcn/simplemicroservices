using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using Play.Common.Settings;

namespace Play.Common.MongoDB;

public static class Extensions
{
    public static IServiceCollection AddMongoDB(this IServiceCollection services)
    {
        BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
        BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String));

        services.AddSingleton(serviceProvider =>
        {
            var configuration = serviceProvider.GetService<IConfiguration>();
            var mongoDBSettings = configuration.GetSection(nameof(MongoDbSettings)).Get<MongoDbSettings>();
            var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();

            var mongoHost = Environment.GetEnvironmentVariable("MONGO_HOST") ?? mongoDBSettings.Host;
            var mongoPort = mongoDBSettings.Port > 0 ? mongoDBSettings.Port : 27017;
            var connectionString = $"mongodb://{mongoHost}:{mongoPort}";

            var mongoClient = new MongoClient(connectionString);
            return mongoClient.GetDatabase(serviceSettings.ServiceName);
        });

        return services;
    }

    public static IServiceCollection AddMongoRepository<T>(this IServiceCollection services, string collectionName)
        where T : IEntity
    {
        services.AddSingleton<IRepository<T>>(serviceProvider =>
        {
            var mongoDatabase = serviceProvider.GetService<IMongoDatabase>();
            return new MongoRepository<T>(mongoDatabase, collectionName);
        });

        return services;
    }
}