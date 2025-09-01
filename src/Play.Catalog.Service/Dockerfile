# Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyalarını kopyala
COPY Play.Catalog.Service/Play.Catalog.Service.csproj Play.Catalog.Service/
COPY Play.Catalog.Contracts/Play.Catalog.Contracts.csproj Play.Catalog.Contracts/
COPY Play.Common/Play.Common.csproj Play.Common/

# Restore yap
RUN dotnet restore Play.Catalog.Service/Play.Catalog.Service.csproj

# Diğer tüm kaynakları kopyala
COPY . .

# Build ve publish
WORKDIR /src/Play.Catalog.Service
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Final image (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Play.Catalog.Service.dll"]
