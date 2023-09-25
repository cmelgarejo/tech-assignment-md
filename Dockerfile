FROM node:current-alpine3.17 AS base

WORKDIR /app

COPY ./src ./src
COPY ./tests ./tests
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./jest.config.ts .
COPY ./.env.example ./.env

RUN npm install && npm cache clean --force

EXPOSE 3000

# CMD ["npm", "run", "dev"]
