FROM node:18-slim AS build-env

WORKDIR /app

COPY server ./

COPY client/build/ ./build/

RUN npm ci
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "start-prod"]