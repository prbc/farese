# farese.com

resource "aws_cloudfront_origin_access_identity" "farese" {}

resource "aws_cloudfront_distribution" "farese" {
  origin {
    domain_name = aws_s3_bucket.farese.bucket_domain_name
    origin_id   = "S3-farese.com"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.farese.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  price_class         = "PriceClass_All"

  aliases = ["farese.com"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "S3-farese.com"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.farese.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
}

# dev.farese.com

resource "aws_cloudfront_origin_access_identity" "dev-farese" {}

resource "aws_cloudfront_distribution" "dev-farese" {
  origin {
    domain_name = aws_s3_bucket.dev-farese.bucket_domain_name
    origin_id   = "S3-dev.farese.com"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.dev-farese.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = ["dev.farese.com"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "S3-dev.farese.com"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.star-farese.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
}

# future.farese.com

resource "aws_cloudfront_origin_access_identity" "future-farese" {}

resource "aws_cloudfront_distribution" "future-farese" {
  origin {
    domain_name = aws_s3_bucket.future-farese.bucket_domain_name
    origin_id   = "S3-future.farese.com"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.future-farese.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = ["future.farese.com"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "S3-future.farese.com"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.star-farese.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
}

