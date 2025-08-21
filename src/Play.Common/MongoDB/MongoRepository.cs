using System.Linq.Expressions;
using MongoDB.Driver;

namespace Play.Common.MongoDB;

public class MongoRepository<T> : IRepository<T> where T : IEntity
{
    private readonly IMongoCollection<T> dbCollection;
    private readonly FilterDefinitionBuilder<T> filterBuilder = Builders<T>.Filter;

    public MongoRepository(IMongoDatabase database, string collectionName)
    {
        dbCollection = database.GetCollection<T>(collectionName);
    }

    public async Task RemoveAsync(Guid id)
    {
        await dbCollection.DeleteOneAsync(filterBuilder.Eq(p => p.Id, id));
    }

    public async Task<IReadOnlyCollection<T>> GetAllAsync()
    {
        return await dbCollection.Find(filterBuilder.Empty).ToListAsync();
    }

    public async Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter)
    {
        return await dbCollection.Find(filter).ToListAsync();
    }

    public async Task<T> GetAsync(Guid id)
    {
        return await dbCollection.Find(filterBuilder.Eq(p => p.Id, id)).FirstOrDefaultAsync();
    }

    public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
    {
        return await dbCollection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(T entity)
    {
        if (entity == null)
            throw new ArgumentNullException("entity");

        await dbCollection.InsertOneAsync(entity);
    }

    public async Task UpdateAsync(T entity)
    {
        if (entity == null)
            throw new ArgumentNullException("entity");

        await dbCollection.ReplaceOneAsync(filterBuilder.Eq(p => p.Id, entity.Id), entity);
    }
}