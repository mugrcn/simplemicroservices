using MassTransit;
using Play.Catalog.Contracts;
using Play.Common;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumers;

public class CatalogItemUpdatedConsumer : IConsumer<CatalogItemUpdated>
{
    public IRepository<CatalogItem> _repository { get; set; }
    public CatalogItemUpdatedConsumer(IRepository<CatalogItem> repository)
    {
        _repository = repository;
    }
    public async Task Consume(ConsumeContext<CatalogItemUpdated> context)
    {
        var message = context.Message;

        var catalogItem = await _repository.GetAsync(message.Id);

        if (catalogItem != null)
        {
            catalogItem = new CatalogItem()
            {
                Id = message.Id,
                Name = message.Name,
                Description = message.Description
            };

            await _repository.CreateAsync(catalogItem);
        }
        else
        {
            catalogItem.Name = message.Name;
            catalogItem.Description = message.Description;

            await _repository.UpdateAsync(catalogItem);
        }
    }
}
