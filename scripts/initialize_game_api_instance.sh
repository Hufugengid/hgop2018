#!/bin/bash

echo 'This script installs everything needed to run our API on the instance'
echo 'and then starts the API.'

echo 'Installing Docker'
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo usermod -aG docker ubuntu

echo 'Install Docker Compose'
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

if [[ ! -f docker-compose.yml ]] ; then
    echo 'File "docker-compose.yml" is not there, aborting.'
    exit 1
fi

echo 'Starting the API'

