FROM node:12.3
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY yarn.lock /home/app/

RUN yarn

COPY . /home/app

CMD node index.js