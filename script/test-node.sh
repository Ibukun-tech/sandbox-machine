#!/bin/bash

BASE_DIR=$(cd "$(dirname "$0")" && pwd)
# BASE_DIR=$(dirname "$(readlink -f "$0")")
TEMP_DIR=$(mktemp -d)

echo "1 $BASE_DIR"
echo "2 $TEMP_DIR"

echo "using temporary directory: $BASE_DIR"
mkdir -p "$BASE_DIR/input" "$BASE_DIR/output"

echo "Testing node.js sandbox....."
cat > "$BASE_DIR/input/test.js" << EOL
console.log('Hello from nodes.js sandbox')
EOL

chmod 744 "$BASE_DIR/input/test.js"

chmod a+rx $BASE_DIR/input

docker run --rm \
    --network none \
    --memory=56m \
    --cpus=0.5 \
    --pids-limit=100 \
    --read-only \
    --tmpfs /tmp:size=50M,noexec \
    -v "$BASE_DIR/input:/sandbox/input:ro" \
    -v "$BASE_DIR/output:/sandbox/output" \
    --security-opt no-new-privileges \
    code-executor-nodejs:latest \
    "test.js"

echo "Node.js sandbox output:"
cat "$BASE_DIR/output/result.json"
echo