provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

data "google_app_engine_default_service_account" "default" {
  project = var.project_id
}