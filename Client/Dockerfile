FROM node:12.18.3

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["serve", "-s", "build", "-p", "3003"]
