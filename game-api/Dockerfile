# Fetching from nodejs version 10, called dubnium. The from instruction specifies the base image from which we are building.
FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
#Tells dockerfile to copy all files in the directory
COPY . .
# Give postgres time to setup before we try to migrate.
CMD sleep 5 && npm run migratedb:pg && node app.js