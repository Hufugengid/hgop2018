#!/bin/sh
#Message display and current date and time
printf "Script starts at: " && date
#Message display and who the current user is
printf "Greetings " && whoami
printf "This script prompts the user with generic information about the system\n" #Message display
printf "*****Current version*****\n" #Message display
lsb_release -a #Shows current version of linux
git --version
printf "npm version: " && npm --version
printf "nodejs version: " && nodejs --version
printf "Script ends at: " && date #Message display and the end date and time of script
cat verify_environment.sh | tee output.log
