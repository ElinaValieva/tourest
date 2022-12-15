provider "google" {}

resource "google_cloudbuild_trigger" "cloud-build-trigger" {
  name        = "cloud-build-trigger"
  project     = var.project_id
  location    = var.region
  description = "CI trigger for deploying to GCP"
  tags        = ["gcp", "cloud_build", var.cloud_run_name]

  github {
    name  = var.github_project_name
    owner = var.github_account
    push {
      branch       = "^master$"
      invert_regex = false
    }
  }

  substitutions = {
    _PROJECT = var.project_id
    _ACCOUNT = lower(var.github_account)
    _APP     = var.cloud_run_name
    _IMAGE   = var.github_project_name
    _REGION  = var.region
  }

  filename = "cloudbuild.yaml"
}