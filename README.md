# ReactxNet

## Quick Start

```bash
dotnet watch --project ./API # or dotnet watch --project ./API --no-hot-reload
```

## Notes

### Noteworthy NuGet Packages

- [Mediator](https://github.com/martinothamar/Mediator) - A high performance implementation of Mediator pattern in .NET
  using source generators. The API and usage is mostly based on the great [MediatR](https://github.com/jbogard/MediatR) library, with some deviations to allow
  for better performance.
- [Mapperly](https://github.com/riok/mapperly) - A .NET source generator for generating object mappings. No runtime
  reflection. Inspired by MapStruct.

### EF Core

Project uses EF Core and SQLite for local development. The database is created in the `API` project, and the migrations
are created in the `Persistence` project.

Migrations
are [automatically applied](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying?tabs=vs#apply-migrations-at-runtime)
in development when the API is started.

1. Install the EF Core tools: `dotnet tool install --global dotnet-ef`

### Creating EF Core migrations

1. Create a migration: `dotnet ef migrations add InitialCreate -s API -p Persistence`
2. Update the database: `dotnet ef database update -s API -p Persistence`

### Revert EF Core migrations

1. Revert the migration: `dotnet ef database update 0 -s API -p Persistence`
2. Delete the migration: `dotnet ef migrations remove -s API -p Persistence`
3. Update the database: `dotnet ef database update -s API -p Persistence`