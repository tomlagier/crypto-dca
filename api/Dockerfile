FROM mhart/alpine-node:8
RUN mkdir www/
WORKDIR www/
ADD . .
RUN npm install
CMD npm run start