FROM node:14.17 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel verbose

COPY . .

RUN npm run build

FROM node:12.13 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]

EXPOSE 3000
