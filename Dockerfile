FROM node:16.6.1
WORKDIR /app
COPY . .
RUN npm install mysql2 mqtt socket.io http express
EXPOSE 1883
EXPOSE 3000
EXPOSE 3306
CMD [ "node","web.js" ]