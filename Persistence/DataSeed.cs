using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class DataSeed
{
    public static async Task EnsureSeeded(DataContext context, UserManager<User> userManager)
    {
        var users = await SeedUsers(userManager);
        await SeedActivities(context, users);

        await context.SaveChangesAsync();
    }

    private static async Task<List<User>> SeedUsers(UserManager<User> userManager)
    {
        if (userManager.Users.Any()) return new List<User>();

        var users = new List<User>
        {
            new()
            {
                Bio = "I love the outdoors and have been rock climbing many times.",
                DisplayName = "Bob Smith",
                UserName = "bob",
                Email = "bob@test.com"
            },
            new()
            {
                Bio = "I am a student at the University of Tartu.",
                DisplayName = "Tom Jones",
                UserName = "tom",
                Email = "tom@test.com"
            },
            new()
            {
                Bio = "I spend my free time reading and listening to music.",
                DisplayName = "Jane Doe",
                UserName = "jane",
                Email = "jane@test.com"
            }
        };

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");
        }

        return users;
    }

    private static async Task SeedActivities(DataContext context, List<User> users)
    {
        if (context.Activities.Any()) return;

        if (!users.Any()) users = context.Users.ToList();

        var activities = new List<Activity>
        {
            new()
            {
                Title = "Visit the Museum",
                Date = DateTime.UtcNow.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "culture",
                City = "Tallinn",
                Venue = "Estonian National Museum",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    }
                }
            },
            new()
            {
                Title = "Visit the Opera",
                Date = DateTime.UtcNow.AddMonths(-2),
                Description = "Activity 2 months ago",
                Category = "culture",
                City = "Tallinn",
                Venue = "Estonian National Opera",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Attend a Festival",
                Date = DateTime.UtcNow.AddDays(-14),
                Description = "Activity 2 weeks ago",
                Category = "music",
                City = "Pärnu",
                Venue = "Pärnu Beach Festival",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[2],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Go to Concert",
                Date = DateTime.UtcNow.AddDays(-14),
                Description = "Activity 2 weeks ago",
                Category = "music",
                City = "Tartu",
                Venue = "Vanemuine Concert Hall",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[2],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Watch a Movie",
                Date = DateTime.UtcNow.AddDays(-3),
                Description = "Activity 3 days ago",
                Category = "film",
                City = "Tallinn",
                Venue = "Solaris Cinema",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[1],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[0],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Hike in the Forest",
                Date = DateTime.UtcNow.AddDays(-2),
                Description = "Activity 2 days ago",
                Category = "travel",
                City = "Otepää",
                Venue = "Pühajärve Park",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[1],
                        IsHost = true
                    }
                }
            },
            new()
            {
                Title = "Eat at a Restaurant",
                Date = DateTime.UtcNow.AddDays(-1),
                Description = "Activity 1 day ago",
                Category = "food",
                City = "Tartu",
                Venue = "Polpo",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "See historical museum",
                Date = DateTime.UtcNow.AddDays(7),
                Description = "Activity 1 week in future",
                Category = "culture",
                City = "Tallinn",
                Venue = "History Museum",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[2],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Listen to music",
                Date = DateTime.UtcNow.AddDays(7),
                Description = "Activity 1 week in future",
                Category = "music",
                City = "Tallinn",
                Venue = "Unibet Arena",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[2],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Have a beer",
                Date = DateTime.UtcNow.AddDays(7),
                Description = "Activity 1 week in future",
                Category = "drinks",
                City = "Tallinn",
                Venue = "A pub",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[2],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Enjoy a tapas",
                Date = DateTime.UtcNow.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "drinks",
                City = "Tallinn",
                Venue = "Some bar",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Have some food",
                Date = DateTime.UtcNow.AddMonths(2),
                Description = "Activity 2 months in future",
                Category = "food",
                City = "Tallinn",
                Venue = "The restobar",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[2],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Listen to more music",
                Date = DateTime.UtcNow.AddMonths(5),
                Description = "Activity 5 months in future",
                Category = "music",
                City = "Tallinn",
                Venue = "Kultuurikatel",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Sightseeing tour",
                Date = DateTime.UtcNow.AddMonths(6),
                Description = "Activity 6 months in future",
                Category = "travel",
                City = "Tallinn",
                Venue = "Somewhere in old town",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[2],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            },
            new()
            {
                Title = "Watch a movie",
                Date = DateTime.UtcNow.AddMonths(7),
                Description = "Activity 7 months in future",
                Category = "film",
                City = "Tallinn",
                Venue = "Cinema",
                Attendees = new List<ActivityAttendee>
                {
                    new()
                    {
                        User = users[0],
                        IsHost = true
                    },
                    new()
                    {
                        User = users[1],
                        IsHost = false
                    }
                }
            }
        };

        await context.Activities.AddRangeAsync(activities);
    }
}