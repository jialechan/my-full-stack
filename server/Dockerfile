FROM node:16.20.0-alpine3.18 AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY src src
RUN npm install

FROM node:16.20.0-alpine3.18
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules/ ./
COPY --from=build /usr/src/app/src ./
EXPOSE 8003
CMD ["node", "/usr/src/app/src/server.js"]
