using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Converters;

public sealed class DateTimeJsonConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return reader.GetDateTime();
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        var isoDate = value.ToString("s");
        writer.WriteStringValue(isoDate);
    }
}