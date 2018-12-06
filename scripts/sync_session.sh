#!/bin/bash

JENKINS_URL=ec2-54-80-8-10.compute-1.amazonaws.com

scp -o StrictHostKeyChecking=no -i "~/.aws/JenkinsAWSKeyPair.pem" ~/.aws/credentials ubuntu@${ec2-54-80-8-10.compute-1.amazonaws.com}:~/credentials
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsAWSKeyPair.pem" ubuntu@${ec2-54-80-8-10.compute-1.amazonaws.com} "sudo mv ~/credentials /var/lib/jenkins/.aws/credentials"
ssh -o StrictHostKeyChecking=no -i "~/.aws/JenkinsAWSKeyPair.pem" ubuntu@${ec2-54-80-8-10.compute-1.amazonaws.com} "sudo chmod a+r /var/lib/jenkins/.aws/credentials"

