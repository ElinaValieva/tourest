variable "project_id" {
  description = "Project ID"
  default     = "gcp-playground-06071995"
  type        = string
}

variable "region" {
  description = "Project Region"
  default     = "us-central1"
  type        = string
}

variable "github_account" {
  description = "Github Account Reference"
  default     = "ElinaValieva"
  type        = string
}

variable "github_project_name" {
  description = "Github Project Name"
  default     = "gcp_playground_system"
  type        = string
}

variable "cloud_run_name" {
  description = "Cloud Run Name"
  default     = "gcp-playground-system"
  type        = string
}