using Serilog.Core;
using Serilog.Events;

namespace Play.Common.Logging;

public class ElasticTimestampEnricher : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        var localIso = logEvent.Timestamp.ToLocalTime().ToString("o");
        var prop = propertyFactory.CreateProperty("@timestamp", localIso);
        logEvent.AddOrUpdateProperty(prop);
    }
}