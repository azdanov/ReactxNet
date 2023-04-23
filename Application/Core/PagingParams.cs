namespace Application.Core;

public class PagingParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 5;

    public int PageNumber { get; set; } = 1;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = Math.Min(value, MaxPageSize);
    }
}