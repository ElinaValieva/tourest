terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.34.0"
    }
  }
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "bucket" {
  project                     = var.PROJECT_ID
  name                        = "${random_id.bucket_prefix.hex}-gcf-source" # Every bucket name must be globally unique
  location                    = "US"
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "object" {
  name   = "function.zip"
  bucket = google_storage_bucket.bucket.name
  source = "functions/function.zip" # Add path to the zipped function source code
}

resource "google_cloudfunctions2_function" "function" {
  project     = var.PROJECT_ID
  name        = "firebase_function"
  location    = var.REGION
  description = "a new function"


  build_config {
    runtime     = "nodejs16"
    entry_point = "post" # Set the entry point
    source {
      storage_source {
        bucket = google_storage_bucket.bucket.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60

    environment_variables = {
      REACT_APP_FIREBASE_API_KEY             = data.google_firebase_web_app_config.basic.api_key
      REACT_APP_FIREBASE_APP_ID              = google_firebase_web_app.wild_workouts.app_id
      REACT_APP_FIREBASE_AUTH_DOMAIN         = data.google_firebase_web_app_config.basic.auth_domain
      REACT_APP_PROJECT_ID                   = var.PROJECT_ID
      REACT_APP_FIREBASE_STORAGE_BUCKET      = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
    }
  }

  depends_on = [google_firebase_project.default]
}

output "function_uri" {
  value = google_cloudfunctions2_function.function.service_config[0].uri
}