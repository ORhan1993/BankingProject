FROM node:22-alpine

WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# Vite'nin varsayılan portu
EXPOSE 5173

# Vite geliştirme sunucusunu tüm ağlara açık şekilde başlat
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
