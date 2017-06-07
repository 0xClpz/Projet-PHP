FROM node

WORKDIR /app/server

COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public

RUN yarn install

EXPOSE 3000
RUN ls /app/server/
CMD node_modules/.bin/react-scripts start
