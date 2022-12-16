data "google_iam_policy" "admin" {
  binding {
    role    = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}

resource "google_storage_bucket_iam_policy" "policy" {
  bucket      = google_storage_bucket.image_bucket.name
  policy_data = data.google_iam_policy.admin.policy_data
}

resource "google_storage_bucket" "image_bucket" {
  name          = var.bucket_reference
  location      = var.region
  storage_class = "STANDARD"
}