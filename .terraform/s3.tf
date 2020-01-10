# farese.com

resource "aws_s3_bucket" "farese" {
  bucket = "farese.com"
  acl    = "private"

  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "farese" {
  bucket = aws_s3_bucket.farese.id

  policy = <<POLICY
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "${aws_cloudfront_origin_access_identity.farese.iam_arn}"
            },
            "Action": "s3:GetObject",
            "Resource": "${aws_s3_bucket.farese.arn}/*"
        }
    ]
}
POLICY
}

resource "aws_s3_bucket_public_access_block" "farese" {
  bucket = aws_s3_bucket.farese.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# dev.farese.com

resource "aws_s3_bucket" "dev-farese" {
  bucket = "dev.farese.com"
  acl    = "private"

  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "dev-farese" {
  bucket = aws_s3_bucket.dev-farese.id

  policy = <<POLICY
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "${aws_cloudfront_origin_access_identity.dev-farese.iam_arn}"
            },
            "Action": "s3:GetObject",
            "Resource": "${aws_s3_bucket.dev-farese.arn}/*"
        }
    ]
}
POLICY
}

resource "aws_s3_bucket_public_access_block" "dev-farese" {
  bucket = aws_s3_bucket.dev-farese.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# future.farese.com

resource "aws_s3_bucket" "future-farese" {
  bucket = "future.farese.com"
  acl    = "private"

  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "future-farese" {
  bucket = aws_s3_bucket.future-farese.id

  policy = <<POLICY
{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "${aws_cloudfront_origin_access_identity.future-farese.iam_arn}"
            },
            "Action": "s3:GetObject",
            "Resource": "${aws_s3_bucket.future-farese.arn}/*"
        }
    ]
}
POLICY
}

resource "aws_s3_bucket_public_access_block" "future-farese" {
  bucket = aws_s3_bucket.future-farese.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

