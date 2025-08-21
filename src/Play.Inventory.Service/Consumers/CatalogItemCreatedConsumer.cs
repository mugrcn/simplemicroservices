using MassTransit;
using Play.Catalog.Contracts;
using Play.Common;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumers;

public class CatalogItemCreatedConsumer : IConsumer<CatalogItemCreated>
{
    public IRepository<CatalogItem> _repository { get; set; }
    public CatalogItemCreatedConsumer(IRepository<CatalogItem> repository)
    {
        _repository = repository;
    }
    public async Task Consume(ConsumeContext<CatalogItemCreated> context)
    {
        var message = context.Message;

        var catalogItem = await _repository.GetAsync(message.Id);

        if (catalogItem != null)
        {
            return;
        }
        catalogItem = new CatalogItem()
        {
            Id = message.Id,
            Name = message.Name,
            Description = message.Description
        };

        await _repository.CreateAsync(catalogItem);

    }
}
