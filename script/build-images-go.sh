# !/bin/bash
BASE_DIR=$(dirname "$(readlink -f "$0")")
SANDBOX_DIR="$BASE_DIR/../sandbox"
echo $SANDBOX_DIR

echo "Buildiing Go sandbox image"
cd "$SANDBOX_DIR/golang"
docker build -t code-executor-golang:latest .
