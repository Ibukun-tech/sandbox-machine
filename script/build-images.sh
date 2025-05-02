# !/bin/bash

BASE_DIR=$(dirname "$(readlink -f "$0")")
SANDBOX_DIR="$BASE_DIR/../sandbox"
echo $SANDBOX_DIR

echo "Building Node.js sandbox image"
cd "$SANDBOX_DIR/nodejs"
docker build -t code-executor-nodejs:latest .

