FROM mhart/alpine-node:9
RUN mkdir www/
WORKDIR www/
RUN apk add --update inotify-tools git
ADD . .
RUN npm install && \
 npm run build
CMD npm run host