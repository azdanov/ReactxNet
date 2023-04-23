using System.Text.Json;

namespace API.Extensions;

public static class HttpExtensions
{
    internal const string Pagination = "Pagination";

    public static void AddPaginationHeader(this HttpResponse response, int currentPage,
        int itemsPerPage, int totalItems, int totalPages)
    {
        var paginationHeader = new
        {
            currentPage,
            itemsPerPage,
            totalItems,
            totalPages
        };
        response.Headers.Add(Pagination, JsonSerializer.Serialize(paginationHeader));
    }
}