variable "PROJECT_ID" {
  description = "Project ID"
  default     = "gcp-playground-06071995"
  type        = string
}

variable "ZONE" {
  description = "Project Zone"
  default     = "us-central"
  type        = string
}

variable "REGION" {
  description = "Project Region"
  default     = "us-central1"
  type        = string
}

variable "GITHUB_ACCOUNT" {
  description = "Github Account Reference"
  default     = "ElinaValieva"
  type        = string
}

variable "GITHUB_PROJECT_NAME" {
  description = "Github Project Name"
  default     = "tourest"
  type        = string
}

variable "CLOUD_RUN_NAME" {
  description = "Cloud Run Name"
  default     = "run_tourest"
  type        = string
}