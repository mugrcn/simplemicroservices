# 1. Build aşaması
FROM node:18-alpine AS build

# Çalışma klasörü
WORKDIR /app

# package.json ve lock dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları kur
RUN npm install

# Tüm kaynak kodu kopyala
COPY . .

# Production build oluştur
RUN npm run build -- --mode docker

# 2. Runtime aşaması
FROM nginx:alpine

# Build edilen dosyaları Nginx'in serve ettiği klasöre kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 portunu dışa aç
EXPOSE 80

# Container başladığında Nginx çalıştır
CMD ["nginx", "-g", "daemon off;"]
