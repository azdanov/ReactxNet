# ReactxNet

A demo project for a [React](https://react.dev/) with a [.NET API](https://dotnet.microsoft.com/en-us/apps/aspnet/apis). Uses [MobX](https://mobx.js.org/) for state management, and [Semantic UI](https://react.semantic-ui.com/) for components.
In the project a user can manage their activities or join other users' activities.

## Quick Start

By default SQLite is used for local development. To use a different database, change the connection string in `appsettings.Development.json`.
Swagger is enabled by default, and can be used to explore the API.

### Install

- .NET 7 SDK: https://dotnet.microsoft.com/download/dotnet/7.0
- Node.js LTS version: https://nodejs.org/en/
- Pnpm package manager: https://pnpm.io/installation
- .NET EF Core tools: `dotnet tool install --global dotnet-ef`

### Run

```bash
# Inside the project directory

dotnet watch --project ./API # To run the API and apply EF Core migrations
cd ./Web # Go to the Web UI directory
pnpm install # Install dependencies
pnpm dev # Run the Web UI
```

## Notes

### Noteworthy NuGet Packages

- [Mediator](https://github.com/martinothamar/Mediator) - A high performance implementation of Mediator pattern in .NET
  using source generators. The API and usage is mostly based on the great [MediatR](https://github.com/jbogard/MediatR) library, with some deviations to allow
  for better performance.
- [Mapperly](https://github.com/riok/mapperly) - A .NET source generator for generating object mappings. No runtime
  reflection. Inspired by MapStruct.
- [FluentValidation](https://github.com/FluentValidation/FluentValidation) - A validation library for .NET that uses a fluent interface and lambda expressions for building strongly-typed validation rules.

### EF Core

Project uses EF Core and SQLite for local development. The database is created in the `API` project, and the migrations
are created in the `Persistence` project.

Migrations are [automatically applied](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying?tabs=vs#apply-migrations-at-runtime)
in development when the API is started.

1. Install the EF Core tools: `dotnet tool install --global dotnet-ef`

#### Creating EF Core migrations

1. Create a migration: `dotnet ef migrations add InitialCreate -s API -p Persistence`
2. Update the database: `dotnet ef database update -s API -p Persistence`

#### Revert EF Core migrations

1. Revert the migration: `dotnet ef database update 0 -s API -p Persistence`
2. Delete the migration: `dotnet ef migrations remove -s API -p Persistence`
3. Update the database: `dotnet ef database update -s API -p Persistence`
