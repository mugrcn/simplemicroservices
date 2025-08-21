using System;
using MassTransit;
using Play.Catalog.Contracts;
using Play.Common;
using Play.Inventory.Service.Entities;

namespace Play.Inventory.Service.Consumers;

public class CatalogItemDeletedConsumer : IConsumer<CatalogItemDeleted>
{
    public IRepository<CatalogItem> _repository { get; set; }

    public CatalogItemDeletedConsumer(IRepository<CatalogItem> repository)
    {
        _repository = repository;
    }
    public async Task Consume(ConsumeContext<CatalogItemDeleted> context)
    {
        var message = context.Message;

        var item = await _repository.GetAsync(message.Id);

        if (item == null)
        {
            return;
        }

        await _repository.RemoveAsync(message.Id);
    }
}
