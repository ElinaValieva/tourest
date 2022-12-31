variable "PROJECT_ID" {
  description = "Project ID"
  type        = string
}

variable "ZONE" {
  description = "Project Zone"
  type        = string
}

variable "REGION" {
  description = "Project Region"
  type        = string
}

variable "GITHUB_ACCOUNT" {
  description = "Github Account Reference"
  default     = "ElinaValieva"
  type        = string
}

variable "GITHUB_PROJECT_NAME" {
  description = "Github Project Name"
  default     = "tourest_gcp"
  type        = string
}

variable "CLOUD_RUN_NAME" {
  description = "Cloud Run Name"
  default     = "run_tourest"
  type        = string
}