FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Application.Api/Application.Api.csproj", "Application.Api/"]
COPY ["Data/Data.csproj", "Data/"]
COPY ["Domain/Domain.csproj", "Domain/"]
RUN dotnet restore "./Application.Api/Application.Api.csproj"
COPY . .
WORKDIR "/src/Application.Api"
RUN dotnet build "./Application.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Application.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Application.Api.dll"]