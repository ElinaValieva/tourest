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
  source = "function.zip" # Add path to the zipped function source code
}

resource "google_cloudfunctions2_function" "function" {
  project     = var.PROJECT_ID
  name        = "firebase"
  location    = var.REGION
  description = "a new function"

  build_config {
    runtime               = "nodejs16"
    entry_point           = "post" # Set the entry point
    source {
      storage_source {
        bucket = google_storage_bucket.bucket.name
        object = google_storage_bucket_object.object.name
      }
    }

    environment_variables = {
      REACT_APP_FIREBASE_API_KEY             = "AIzaSyBaBiVelTj_vAI0zO-RimrcDKntshbLz6g"
      REACT_APP_FIREBASE_APP_ID              = "1:253120544678:web:2e83db47d66e6d2c639967"
      REACT_APP_FIREBASE_AUTH_DOMAIN         = "gcp-playground-06071995.firebaseapp.com"
      REACT_APP_PROJECT_ID                   = "gcp-playground-06071995"
      REACT_APP_FIREBASE_STORAGE_BUCKET      = "gcp-playground-06071995.appspot.com"
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "253120544678"
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
  }
}

output "function_uri" {
  value = google_cloudfunctions2_function.function.service_config[0].uri
}