FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./

COPY app.js ./

COPY bin ./bin
COPY database ./database
COPY routes ./routes

run npm ci --only=production
ENV NODE_ENV=production

CMD ["./bin/www"]
