#!/bin/sh
echo "--Checking if internet works--"
if ping -q -c 1 -W 1 8.8.8.8; then
	echo "--Internet is connected--"
	cd ..
	terraform destroy -auto-approve
	terraform apply -auto-approve
	ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
else
	echo "--Your internet doesnt work--"
fi

