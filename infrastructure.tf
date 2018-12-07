# This tells us that we want to use aws cloud service as a provider.
# The cloud services region is us-east-1.
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# Creates a security group called game and uses the public port 22 and 3000, egress is outbound traffic for any.

resource "aws_security_group" "game_security_group" {
  name   = "GameSecurityGroup"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# Creating aws instance for game 
# going trough the following steps, naming and specifying the values below.
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = ["${aws_security_group.game_security_group.id}"]
  tags {
    Name = "GameServer"
  }
  # Gets the api script and puts it in the desired destination. Tells what connection is needed and where the key is located.
  provisioner "file" {
    source      = "/var/lib/jenkins/workspace/freestyle-hufugengi/repository/scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
    # Gets the api script and puts it in the desired destination. Tells what connection is needed and where the key is located.
  provisioner "file" {
    source      = "/var/lib/jenkins/workspace/freestyle-hufugengi/repository/scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  
  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  
  # Makes the api script remote executable.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
      "chmod +x /home/ubuntu/docker_compose_up.sh",
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
}

# Giving the variable public_ip the ip on the server.
output "public_ip" {
  value = "${aws_instance.game_server.public_ip}"
}