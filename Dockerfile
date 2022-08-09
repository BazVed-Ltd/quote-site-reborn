FROM node:16-alpine as base
WORKDIR /usr/src/app

COPY package*.json ./


from base as development

RUN npm install

COPY . ./

ENV DEBUG=quote-site-reborn:*
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]


from base as production

COPY app.js ./

COPY bin ./bin
COPY database ./database
COPY routes ./routes

run npm ci --only=production
ENV NODE_ENV=production

CMD ["./bin/www"]
