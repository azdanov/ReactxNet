using Domain;

namespace Persistence;

public static class DataSeed
{
    public static async Task EnsureSeeded(DataContext context)
    {
        if (context.Activities.Any()) return;

        var activities = new List<Activity>
        {
            new()
            {
                Title = "Visit the Museum",
                Date = DateTime.UtcNow.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "culture",
                City = "Tallinn",
                Venue = "Estonian National Museum"
            },
            new()
            {
                Title = "Visit the Opera",
                Date = DateTime.UtcNow.AddMonths(-1),
                Description = "Activity 1 months ago",
                Category = "culture",
                City = "Tallinn",
                Venue = "Estonian National Opera"
            },
            new()
            {
                Title = "Attend a Festival",
                Date = DateTime.UtcNow.AddDays(-21),
                Description = "Activity 3 weeks ago",
                Category = "music",
                City = "Pärnu",
                Venue = "Pärnu Beach Festival"
            },
            new()
            {
                Title = "Go to Concert",
                Date = DateTime.UtcNow.AddDays(-14),
                Description = "Activity 2 weeks ago",
                Category = "music",
                City = "Tartu",
                Venue = "Vanemuine Concert Hall"
            },
            new()
            {
                Title = "Watch a Movie",
                Date = DateTime.UtcNow.AddDays(-3),
                Description = "Activity 3 days ago",
                Category = "film",
                City = "Tallinn",
                Venue = "Solaris Cinema"
            },
            new()
            {
                Title = "Hike in the Forest",
                Date = DateTime.UtcNow.AddDays(-2),
                Description = "Activity 2 days ago",
                Category = "travel",
                City = "Otepää",
                Venue = "Pühajärve Park"
            },
            new()
            {
                Title = "Eat at a Restaurant",
                Date = DateTime.UtcNow.AddDays(-1),
                Description = "Activity 1 day ago",
                Category = "food",
                City = "Tartu",
                Venue = "Polpo"
            },
            new()
            {
                Title = "See historical museum",
                Date = DateTime.UtcNow.AddDays(7),
                Description = "Activity 1 week in future",
                Category = "culture",
                City = "Tallinn",
                Venue = "History Museum"
            },
            new()
            {
                Title = "Listen to music",
                Date = DateTime.UtcNow.AddMonths(1),
                Description = "Activity 1 months in future",
                Category = "music",
                City = "Tallinn",
                Venue = "Unibet Arena"
            },
            new()
            {
                Title = "Have a beer",
                Date = DateTime.UtcNow.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "drinks",
                City = "Tallinn",
                Venue = "A pub"
            },
            new()
            {
                Title = "Enjoy a tapas",
                Date = DateTime.UtcNow.AddMonths(3),
                Description = "Activity 3 months in future",
                Category = "drinks",
                City = "Tallinn",
                Venue = "Some bar"
            },
            new()
            {
                Title = "Have some food",
                Date = DateTime.UtcNow.AddMonths(4),
                Description = "Activity 4 months in future",
                Category = "food",
                City = "Tallinn",
                Venue = "The restobar"
            },
            new()
            {
                Title = "Listen to more music",
                Date = DateTime.UtcNow.AddMonths(5),
                Description = "Activity 5 months in future",
                Category = "music",
                City = "Tallinn",
                Venue = "Kultuurikatel"
            },
            new()
            {
                Title = "Sightseeing tour",
                Date = DateTime.UtcNow.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "travel",
                City = "Tallinn",
                Venue = "Somewhere in old town"
            },
            new()
            {
                Title = "Watch a movie",
                Date = DateTime.UtcNow.AddMonths(7),
                Description = "Activity 7 months in future",
                Category = "film",
                City = "Tallinn",
                Venue = "Cinema"
            }
        };

        await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }
}