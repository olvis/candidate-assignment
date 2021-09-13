FROM node:12-alpine
WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm i --quiet --only=prod
COPY ./dist/ ./dist
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime", "dist/index.js"]