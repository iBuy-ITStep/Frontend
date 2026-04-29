# Этап 1: Сборка
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV VITE_API_BASE_URL=http://pi:8081/api/

# Этап 2: Раздача статики через Nginx
FROM nginx:stable-alpine
# Копируем билд из первого этапа в папку, которую обслуживает nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем конфиг nginx (если есть свой)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]