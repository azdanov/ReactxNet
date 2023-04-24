FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

# Install NodeJs
RUN apt-get -y update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node \
    && apt-get clean \
    && echo 'node verions:' $(node -v) \
    && echo 'pnpm version:' $(pnpm -v) \
    && echo 'dotnet version:' $(dotnet --version)

# copy .csproj and restore as distinct layers
COPY "ReactxNet.sln" "ReactxNet.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
RUN dotnet restore "ReactxNet.sln"

# build ui
COPY "Web/." "Web/."
WORKDIR /app/Web
RUN pnpm install
RUN pnpm run build:api

# copy everything else and build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]