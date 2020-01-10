resource "aws_acm_certificate" "farese" {
  domain_name       = "farese.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate" "star-farese" {
  domain_name       = "*.farese.com"
  validation_method = "DNS"
}

