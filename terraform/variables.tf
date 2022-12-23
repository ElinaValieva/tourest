variable "project_id" {
  description = "Project ID"
  default     = "test-staging-372514"
  type        = string
}

variable "zone" {
  description = "Project Zone"
  default     = "us-central"
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
  default     = "tourest"
  type        = string
}

variable "cloud_run_name" {
  description = "Cloud Run Name"
  default     = "run_tourest"
  type        = string
}