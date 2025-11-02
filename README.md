# rustfs-starter

Minimal rustfs S3 test template with Bun.

## Quick Start

```bash
docker compose up -d
AWS_ACCESS_KEY_ID=rustfsadmin AWS_SECRET_ACCESS_KEY=rustfsadmin \
AWS_ENDPOINT_URL=http://localhost:9000 aws --endpoint-url \
http://localhost:9000 s3 mb s3://test-bucket
bun test
```

## Requirements

- Docker
- Bun
- AWS CLI (for bucket creation)

## What's Included

- `docker-compose.yml` - rustfs service
- `test.ts` - Upload/download test using Bun's S3Client
- `.env.local` - Configuration (create from template)

## Usage

```bash
bun docker:up      # Start rustfs
bun docker:down    # Stop rustfs
bun test           # Run test
```

