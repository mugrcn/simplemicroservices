using DnsClient.Internal;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Play.Common.Logging;

public class LogActionFilter : IActionFilter
{
    private readonly ILogger<LogActionFilter> _logger;
    public LogActionFilter(ILogger<LogActionFilter> logger)
    {
        _logger = logger;
    }
    public void OnActionExecuted(ActionExecutedContext context)
    {
        _logger.LogInformation("🎬 Action completed: {ActionName}", context.ActionDescriptor);
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        _logger.LogInformation("✅ Action executing: {ActionName}", context.ActionDescriptor);
    }
}
