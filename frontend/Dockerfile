# 1. Aşama: Build (Node sürümü 18'den 22'ye yükseltildi)
FROM node:22-alpine as build
WORKDIR /app

# Sadece package.json'ı kopyalıyoruz
COPY package.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

# Kaynak kodları kopyalıyoruz
COPY . .

# Projeyi derliyoruz (dist klasörü oluşur)
RUN npm run build

# 2. Aşama: Nginx ile Sunum
FROM nginx:alpine

# Build aşamasından çıkan dosyaları Nginx'e kopyalıyoruz
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx ayar dosyasını kopyalıyoruz
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]