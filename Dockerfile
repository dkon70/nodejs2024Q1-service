FROM node:20.11.1-alpine

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE ${PORT}

CMD ["npm", "run", "start"]