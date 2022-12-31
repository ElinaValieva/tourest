resource "google_cloudbuild_trigger" "cloud-build-trigger" {
  name        = "cloud-build-trigger"
  location    = var.REGION
  description = "CI trigger for deploying to GCP"
  tags        = ["gcp", "cloud_build", var.CLOUD_RUN_NAME]

  source_to_build {
    uri       = format("https://github.com/%s/%s", var.GITHUB_ACCOUNT, var.GITHUB_PROJECT_NAME)
    ref       = "refs/heads/main"
    repo_type = "GITHUB"
  }

  substitutions = {
    _PROJECT                      = var.PROJECT_ID
    _ACCOUNT                      = lower(var.GITHUB_ACCOUNT)
    _APP                          = var.CLOUD_RUN_NAME
    _IMAGE                        = var.GITHUB_PROJECT_NAME
    _REGION                       = var.REGION
    _FIREBASE_API_KEY             = data.google_firebase_web_app_config.basic.api_key
    _FIREBASE_APP_ID              = google_firebase_web_app.firebase_web_app.app_id
    _FIREBASE_AUTH_DOMAIN         = data.google_firebase_web_app_config.basic.auth_domain
    _FIREBASE_STORAGE_BUCKET      = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
    _FIREBASE_MESSAGING_SENDER_ID = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
  }

  filename = "cloudbuild.yaml"

  depends_on = [google_firebase_project.default]
}