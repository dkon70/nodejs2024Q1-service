FROM node:20.11.1-alpine as build

WORKDIR /app

COPY . .

RUN npm i

FROM node:20.11.1-alpine as final

WORKDIR /app

COPY package*.json ./

COPY --from=build /app /app

RUN npm i

EXPOSE ${PORT}

CMD npx prisma migrate deploy && npm run start