# Build & Dependencies Stage
FROM node:22 AS builder

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve App via Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*.conf
COPY ./be-mushroom.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]