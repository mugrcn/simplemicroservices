using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Play.Catalog.Contracts;
using Play.Catalog.Service.Dtos;
using Play.Catalog.Service.Entities;
using Play.Common;

namespace Play.Catalog.Service.Controllers;

[ApiController]
[Route("items")]
public class ItemsController : ControllerBase
{
    private readonly IRepository<Item> _repository;
    private readonly ILogger<ItemsController> _logger;
    private readonly IPublishEndpoint _publishEndpoint;

    public ItemsController(IRepository<Item> repository, ILogger<ItemsController> logger, IPublishEndpoint publishEndpoint)
    {
        _repository = repository;
        _logger = logger;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetAsync()
    {
        var items = await _repository.GetAllAsync();
        return Ok(items.Select(p => p.AsDto()));
    }

    // Burada route name verdik, CreatedAtRoute için önemli
    [HttpGet("{id}", Name = "GetItemById")]
    public async Task<ActionResult<ItemDto>> GetByIdAsync(Guid id)
    {
        var item = await _repository.GetAsync(id);
        if (item == null)
            return NotFound();

        return item.AsDto();
    }

    [HttpPost]
    public async Task<ActionResult<ItemDto>> CreateAsync([FromBody] CreateItemDto dto)
    {
        var item = new Item
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            CreatedDate = DateTimeOffset.UtcNow
        };

        await _repository.CreateAsync(item);

        await _publishEndpoint.Publish(new CatalogItemCreated(item.Id, item.Name, item.Description));

        // CreatedAtRoute kullanıyoruz, route ismi "GetItemById" olmalı
        return CreatedAtRoute("GetItemById", new { id = item.Id }, item.AsDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateItemDto dto)
    {
        var item = await _repository.GetAsync(id);
        if (item == null)
            return NotFound();

        item.Name = dto.Name;
        item.Description = dto.Description;
        item.Price = dto.Price;

        await _repository.UpdateAsync(item);

        await _publishEndpoint.Publish(new CatalogItemUpdated(item.Id, item.Name, item.Description));

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var item = await _repository.GetAsync(id);
        if (item == null)
            return NotFound();

        await _repository.RemoveAsync(id);

        await _publishEndpoint.Publish(new CatalogItemDeleted(item.Id));
        return NoContent();
    }
}