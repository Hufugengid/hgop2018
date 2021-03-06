#!/bin/sh
#Message display and current date and time at start of script
printf "Script starts at: " && date | tee logfile.log
#Message display and who the current user is
printf "Greetings " && whoami | tee -a logfile.log
#Message display
printf "This script prompts the user with generic information about the system\n" 
#Message display
printf "*****Current version*****\n" 
#Shows current version of linux
lsb_release -a | tee -a logfile.log
#Shows current version of git
git --version | tee -a logfile.log
#if ! [ -x "$(command -v jest)" ]; then
#  echo 'Error: jest is not installed.' 
#fi
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' 
else
#For readability in log file
printf "npm version " >> logfile.log
#Shows current version of npm
printf "npm version " && npm --version | tee -a logfile.log
#For readability in log file

fi

if ! [ -x "$(command -v node)" ]; then
  echo 'Error: nodejs is not installed.' 
else
printf "nodejs version " >> logfile.log
#Shows current version of nodejs
printf "nodejs version " && nodejs --version | tee -a logfile.log
fi

if ! [ -x "$(command -v aws)" ]; then
  echo 'Error: aws is not installed.' 
else
#For readability in log file
printf "aws version " >> logfile.log
#Shows current version of aws
printf "aws version " && aws --version | tee -a logfile.log
fi

#Message display and current date and time at end of script
printf "Script ends at: " && date | tee -a logfile.log
