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

resource "google_firebaserules_release" "default" {
  provider     = google-beta
  name         = "cloud.firestore"
  project      = var.project_id
  ruleset_name = google_firebaserules_ruleset.basic.name

  depends_on = [google_firebase_project.default]
}

resource "google_firebaserules_ruleset" "basic" {
  provider = google-beta
  source {
    files {
      content     = "service cloud.firestore {match /databases/{database}/documents { match /{document=**} { allow read, write: if true; } } }"
      name        = "firestore.rules"
      fingerprint = ""
    }

    language = ""
  }

  project    = var.project_id
  depends_on = [google_firebase_project.default]
}