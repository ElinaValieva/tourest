locals {
  services = [
    "firestore.googleapis.com",
    "appengine.googleapis.com",
    "run.googleapis.com",
    "iam.googleapis.com",
    "cloudbuild.googleapis.com",
    "firebase.googleapis.com",
    "firebaserules.googleapis.com"
  ]
}

resource "google_project_service" "default" {
  for_each                   = toset(local.services)
  project                    = var.PROJECT_ID
  service                    = each.value
  disable_dependent_services = true
  disable_on_destroy         = false

  depends_on = [var.PROJECT_ID]
}