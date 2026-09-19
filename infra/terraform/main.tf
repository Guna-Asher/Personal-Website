terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.22"
    }
  }
}

provider "aws" {
  region = "ap-south-2"
}

resource "aws_security_group" "portfolio" {
  name                   = "launch-wizard-9"
  description            = "launch-wizard-9 created 2026-09-17T08:56:14.342Z"
  vpc_id                 = "vpc-0231646265ca5541f"
  revoke_rules_on_delete = false

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "portfolio" {
  ami           = "ami-0199ac7c9fbf9ed83"
  instance_type = "t3.small"

  subnet_id              = "subnet-0f726cb257f6fd8fd"
  vpc_security_group_ids = [aws_security_group.portfolio.id]
  key_name               = "Guna-Portfolio-Key"

  associate_public_ip_address = true
  ebs_optimized               = true
  monitoring                  = false

  credit_specification {
    cpu_credits = "unlimited"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 2
    http_protocol_ipv6          = "disabled"
    instance_metadata_tags      = "disabled"
  }

  root_block_device {
    delete_on_termination = true
    encrypted             = false
    volume_size           = 15
    volume_type           = "gp3"
    iops                  = 3000
    throughput            = 125
  }

  tags = {
    Name = "Guna-Portfolio"
  }
}
