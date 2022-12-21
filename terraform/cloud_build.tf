resource "google_cloudbuild_trigger" "cloud-build-trigger" {
  name        = "cloud-build-trigger"
  location    = var.region
  description = "CI trigger for deploying to GCP"
  tags        = ["gcp", "cloud_build", var.cloud_run_name]

  source_to_build {
    uri       = format("https://github.com/%s/%s", var.github_account, var.github_project_name)
    ref       = "refs/heads/main"
    repo_type = "GITHUB"
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