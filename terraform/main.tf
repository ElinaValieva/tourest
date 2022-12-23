provider "google" {
  project = var.PROJECT_ID
  region  = var.REGION
  zone    = var.ZONE
}

data "google_app_engine_default_service_account" "default" {
  project = var.PROJECT_ID
}