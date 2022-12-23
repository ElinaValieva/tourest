provider "google-beta" {
  project     = var.project_id
  region      = var.region
  credentials = base64decode(google_service_account_key.firebase_key.private_key)
}

resource "google_firebase_project" "default" {
  provider = google-beta

  depends_on = [
    google_project_service.firebase,
    google_project_iam_member.service_account_storage_admin,
    google_project_iam_member.service_account_firebase_admin
  ]
}

resource "google_firebase_project_location" "default" {
  provider = google-beta

  location_id = var.zone

  depends_on = [
    google_firebase_project.default,
  ]
}

resource "google_firebase_web_app" "wild_workouts" {
  provider     = google-beta
  display_name = lower(var.github_project_name)

  depends_on = [google_firebase_project.default]
}

data "google_firebase_web_app_config" "basic" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.wild_workouts.app_id
}