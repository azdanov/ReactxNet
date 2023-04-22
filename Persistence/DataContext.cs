using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<ActivityAttendee> ActivityAttendees => Set<ActivityAttendee>();
    public DbSet<Photo> Photos => Set<Photo>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<UserFollowing> UserFollowings => Set<UserFollowing>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.UserId }));

        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.User)
            .WithMany(u => u.Activities)
            .HasForeignKey(aa => aa.UserId);

        builder.Entity<Comment>()
            .HasOne(c => c.Activity)
            .WithMany(a => a.Comments)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserFollowing>(b =>
        {
            b.HasKey(uf => new { uf.SourceId, uf.TargetId });

            b.HasOne(uf => uf.Source)
                .WithMany(u => u.Followings)
                .HasForeignKey(uf => uf.SourceId)
                .OnDelete(DeleteBehavior.Cascade);
            b.HasOne(uf => uf.Target)
                .WithMany(u => u.Followers)
                .HasForeignKey(userFollowing => userFollowing.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}