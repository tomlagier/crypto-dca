FROM mhart/alpine-node:9
RUN mkdir www/
WORKDIR www/
ADD . .
RUN npm install
CMD npm run build && npm run start