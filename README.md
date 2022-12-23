# Tourest app
> A reference project to deploy a static React app onto Google Cloud Run, Cloud Build as the CI/CD tool, and Cloud Firebase Web as a serverless backend.

## Prerequisites :heavy_exclamation_mark:
- Google Cloud Project with a configured billing account
- Terraform

## Deploy :hammer:
Run the script for deploying an application to a cloud project via terraform.
```shell
 ./init.sh
```
## Run locally :low_brightness:
1. Create a firebase project and register your app with [the following instruction](https://firebase.google.com/docs/web/setup)
2. Create a .env file with the following `example.env` and copy content from `firebaseConfig`
3. Run npm run start and visit app at http://localhost:3000