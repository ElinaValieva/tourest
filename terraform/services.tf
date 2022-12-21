locals {
  services = [
    "firestore.googleapis.com",
    "appengine.googleapis.com",
    "run.googleapis.com",
    "iam.googleapis.com"

  ]
}

resource "google_project_service" "firebase" {
  service    = "firebase.googleapis.com"
  depends_on = [var.project_id]

  disable_dependent_services = true
}