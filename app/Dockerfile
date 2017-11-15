FROM mhart/alpine-node:8
RUN mkdir www/
WORKDIR www/
ADD . .
RUN apk add --update python make g++ && \
 npm install && \
 npm run build
CMD npm run host