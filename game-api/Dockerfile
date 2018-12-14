# Fetching from nodejs version 10, called dubnium. The from instruction specifies the base image from which we are building.
FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
#Tells dockerfile to copy all files in the directory
COPY package.json package.json
COPY package-lock.json package-lock.json
#Runs the npm install to fetch the packages
RUN npm install --production
COPY . .
# Give postgres time to setup before we try to migrate.
CMD sleep 5 && npm run migratedb:pg && node app.js