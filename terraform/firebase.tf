resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id
}

resource "google_firebase_web_app" "basic" {
  provider        = google-beta
  project         = var.project_id
  display_name    = "Display Name Basic"
  deletion_policy = "DELETE"

  depends_on = [google_firebase_project.default]
}

data "google_firebase_web_app_config" "basic" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.basic.app_id
}

resource "google_storage_bucket" "default" {
  project  = var.project_id
  provider = google-beta
  name     = "fb_bucket_xxx"
  location = "US"
}

resource "google_storage_bucket_object" "default" {
  provider = google-beta
  bucket   = google_storage_bucket.default.name
  name     = "firebase-config.json"

  content = jsonencode({
    appId             = google_firebase_web_app.basic.app_id
    apiKey            = data.google_firebase_web_app_config.basic.api_key
    authDomain        = data.google_firebase_web_app_config.basic.auth_domain
    databaseURL       = lookup(data.google_firebase_web_app_config.basic, "database_url", "")
    storageBucket     = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
    messagingSenderId = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
    measurementId     = lookup(data.google_firebase_web_app_config.basic, "measurement_id", "")
  })
}
resource "google_firestore_document" "firebase_doc" {
  project     = var.project_id
  collection  = var.bucket_reference
  document_id = "${random_uuid.test.result}-rp"
  fields      = "{\"akey\":{\"stringValue\":\"avalue\"}}"
}

resource "random_uuid" "test" {}