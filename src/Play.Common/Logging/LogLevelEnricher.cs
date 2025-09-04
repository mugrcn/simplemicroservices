using Serilog.Core;
using Serilog.Events;

namespace Play.Common.Logging;

public class LogLevelEnricher : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        var level = logEvent.Level.ToString();
        logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty("LogLevel", level));
    }
}
