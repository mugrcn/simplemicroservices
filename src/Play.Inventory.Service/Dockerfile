# Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Proje dosyalarını kopyala
COPY Play.Inventory.Service/Play.Inventory.Service.csproj Play.Inventory.Service/
COPY Play.Catalog.Contracts/Play.Catalog.Contracts.csproj Play.Catalog.Contracts/
COPY Play.Common/Play.Common.csproj Play.Common/

# Restore yap
RUN dotnet restore Play.Inventory.Service/Play.Inventory.Service.csproj

# Diğer tüm kaynakları kopyala
COPY . .

# Build ve publish
WORKDIR /src/Play.Inventory.Service
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Final image (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Play.Inventory.Service.dll"]
