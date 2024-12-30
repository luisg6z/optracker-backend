FROM node:23 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:23-alpine
COPY --from=build /app/dist ./dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["node", "dist/main"]