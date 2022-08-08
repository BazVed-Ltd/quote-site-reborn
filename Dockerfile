FROM node:16 as base
WORKDIR /usr/src/app

COPY package*.json app.js ./
COPY bin ./bin
COPY database ./database
COPY routes ./routes


from base as development

RUN npm install

ENV DEBUG=quote-site-reborn:*
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]


from base as production

run npm ci --only=production
ENV NODE_ENV=production

CMD ["./bin/www"]
