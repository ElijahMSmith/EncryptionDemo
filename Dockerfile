FROM node:18 AS build-env
COPY server /app
WORKDIR /app
RUN npm ci
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start-prod"]