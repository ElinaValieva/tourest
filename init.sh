#!/bin/bash
cd terraform || exit 1
terraform init
terraform plan
terraform apply -auto-approve
exec bash