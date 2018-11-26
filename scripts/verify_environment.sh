#!/bin/sh
#Message display and current date and time
printf "Script starts at: " && date | tee logfile.log
#Message display and who the current user is
printf "Greetings " && whoami | tee -a logfile.log
printf "This script prompts the user with generic information about the system\n" #Message display
printf "*****Current version*****\n" #Message display
lsb_release -a | tee -a logfile.log
git --version | tee -a logfile.log
printf "npm version " >> logfile.log
printf "npm version " && npm --version | tee -a logfile.log
printf "nodejs version " >> logfile.log
printf "nodejs version " && nodejs --version | tee -a logfile.log
printf "Script ends at: " && date | tee -a logfile.log
