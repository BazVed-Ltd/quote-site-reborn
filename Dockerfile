FROM node:16 as base
WORKDIR /usr/src/app

COPY package*.json ./
COPY bin database routes app.js ./


from base as development

RUN npm install

ENV DEBUG=quote-site-reborn:*
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]


from base as production

run npm ci --only=production
ENV NODE_ENV=production

CMD ["./bin/www"]
