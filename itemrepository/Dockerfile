# Fetching from nodejs version 10, called dubnium. The from instruction specifies the base image from which we are building.
FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
#Tells dockerfile to copy the jsonfile in the directory
COPY package.json package.json
#Tells dockerfile to copy the databasefile in the directory
COPY database.js database.js
#Tells dockerfile to copy the appfile in the directory
COPY app.js app.js
#Runs the npm install to fetch the packages
RUN npm install
#Provides defaults for this executable container
CMD node app.js