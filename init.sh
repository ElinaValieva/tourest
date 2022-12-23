#!/bin/bash
# shellcheck disable=SC2162
# shellcheck disable=SC2006
# shellcheck disable=SC2154
# shellcheck disable=SC2237

project=`gcloud config list --format 'value(core.project)' 2>/dev/null`
if ! [ -z "$project" ]; then
    echo "Would you like to override $project: y/n"
    read flag
fi

# Read project name
if [[ -z "$project" || "$flag" == "y" ]]; then
    echo "Enter project name: "
    read project
fi
echo "TF_VAR_PROJECT=$project"
export TF_VAR_PROJECT_ID="$project"

# Read region
region=`gcloud config list --format 'value(functions.region)' 2>/dev/null`
if ! [ -z "$region" ]; then
    echo "Would you like to override $region: y/n"
    read flag
fi

if [[ -z "$region" || "$flag" == "y" ]]; then
    echo "Enter Region: "
    read region
fi
echo "TF_VAR_REGION=$region"
export TF_VAR_REGION="$region"

# Read zone name
zone=`gcloud config get-value compute/zone`
if ! [[ -z "$zone" || "$zone" == "(unset)" ]]; then
    echo "Would you like to override $zone: y/n"
    read flag
fi

if [[ -z "$zone" || "$flag" -eq "y" ]]; then
    echo "Enter Zone: "
    read zone
fi
echo "TF_VAR_ZONE=$zone"
export TF_VAR_ZONE="$zone"


echo "[${GCP_PROJECT}] Starting initialization for compute/zone: ${TF_VAR_ZONE} compute/region: ${TF_VAR_REGION}"
cd terraform || exit 1
terraform init
terraform plan
terraform apply -auto-approve
exec bash