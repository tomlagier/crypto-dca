FROM mhart/alpine-node:9
WORKDIR /usr/www/
RUN apk add --update inotify-tools git
COPY package.json package-lock.json /tmp/
RUN cd /tmp && \
 npm install && \
 cd /usr/www/ && \
 ln -s /tmp/node_modules
COPY . .
CMD npm run start