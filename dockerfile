FROM node:18

WORKDIR /app

COPY package.json .
RUN npm i
COPY ./src ./src

CMD ["npm", "run", "start"]