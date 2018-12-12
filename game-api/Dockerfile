# Fetching from nodejs version 10, called dubnium. The from instruction specifies the base image from which we are building.
FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
#Tells dockerfile to copy all files in the directory
COPY . .
#Runs the npm install to fetch the packages
RUN npm install --production
#Provides defaults for this executable container
CMD node app.js
