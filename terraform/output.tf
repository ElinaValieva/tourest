output "REACT_APP_FIREBASE_API_KEY" {
  value = data.google_firebase_web_app_config.basic.api_key
}

output "REACT_APP_FIREBASE_APP_ID" {
  value = google_firebase_web_app.firebase_web_app.app_id
}

output "REACT_APP_FIREBASE_AUTH_DOMAIN" {
  value = data.google_firebase_web_app_config.basic.auth_domain
}

output "REACT_APP_PROJECT_ID" {
  value = var.PROJECT_ID
}

output "REACT_APP_FIREBASE_STORAGE_BUCKET" {
  value = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
}

output "REACT_APP_FIREBASE_MESSAGING_SENDER_ID" {
  value = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
}