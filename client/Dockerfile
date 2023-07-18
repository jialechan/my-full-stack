FROM node:16.20.0-alpine3.18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY vite.config.js ./
COPY src src
COPY *.html ./
RUN npm install
RUN npm run build

FROM nginx
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/dist
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
