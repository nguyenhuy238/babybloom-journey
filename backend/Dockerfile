FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution and project files
COPY BabyFirst.Backend.slnx ./
COPY src/BabyFirst.Api/BabyFirst.Api.csproj src/BabyFirst.Api/
COPY src/BabyFirst.Application/BabyFirst.Application.csproj src/BabyFirst.Application/
COPY src/BabyFirst.Domain/BabyFirst.Domain.csproj src/BabyFirst.Domain/
COPY src/BabyFirst.Infrastructure/BabyFirst.Infrastructure.csproj src/BabyFirst.Infrastructure/

# Restore dependencies
RUN dotnet restore src/BabyFirst.Api/BabyFirst.Api.csproj

# Copy everything else
COPY src/ src/

# Build and publish
WORKDIR /app/src/BabyFirst.Api
RUN dotnet publish -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Development

EXPOSE 8080
ENTRYPOINT ["dotnet", "BabyFirst.Api.dll"]
