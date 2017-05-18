FROM nodered/node-red-docker

USER root
RUN npm install gulp-cli -g
RUN mkdir /workspace

EXPOSE 1880
