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
    _PROJECT                      = var.project_id
    _ACCOUNT                      = lower(var.github_account)
    _APP                          = var.cloud_run_name
    _IMAGE                        = var.github_project_name
    _REGION                       = var.region
    _FIREBASE_API_KEY             = data.google_firebase_web_app_config.basic.api_key
    _FIREBASE_APP_ID              = google_firebase_web_app.wild_workouts.app_id
    _FIREBASE_AUTH_DOMAIN         = data.google_firebase_web_app_config.basic.auth_domain
    _FIREBASE_STORAGE_BUCKET      = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
    _FIREBASE_MESSAGING_SENDER_ID = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
  }

  filename = "cloudbuild.yaml"

  depends_on = [google_firebase_project.default]
}