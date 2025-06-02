using Domain;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure;

internal sealed class ClubDbContext(DbContextOptions<ClubDbContext> options) : DbContext(options)
{
    public const string DefaultSchema = "club";
    public const string KnwuSchema = "knwu";
    public const string MigrationsTable = "ef_migrations";

    public DbSet<KnwuWedstrijd> KnwuWedstrijden { get; private set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasDefaultSchema(DefaultSchema)
            .ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
    }
}