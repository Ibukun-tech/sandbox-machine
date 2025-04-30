#!/bin/bash

# BASE_DIR=$(cd "$(dirname "$0")")
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR=$(cd "$(dirname "$0")" && pwd | sed 's/\\/\//g' | sed 's/^[A-Za-z]:\///')

# BASE_DIR=$(dirname "$(readlink -f "$0")")
TEMP_DIR=$(mktemp -d | sed 's/\\/\//g' | sed 's/^[A-Za-z]:\///')
# TEMP_DIR=$(mktemp -d)

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

docker run  \
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



Prompt that I am going to write i feel
# I am on a windows machine and my operating system is  windows I am using gitbash to run a shell script now  this is the shell script

# #!/bin/bash



# BASE_DIR=$(cd "$(dirname "$0")" && pwd)

# # BASE_DIR=$(dirname "$(readlink -f "$0")")

# TEMP_DIR=$(mktemp -d)



# echo "1 $BASE_DIR"

# echo "2 $TEMP_DIR"



# echo "using temporary directory: $BASE_DIR"

# mkdir -p "$BASE_DIR/input" "$BASE_DIR/output"



# echo "Testing node.js sandbox....."

# cat > "$BASE_DIR/input/test.js" << EOL

# console.log('Hello from nodes.js sandbox')

# EOL



# chmod 744 "$BASE_DIR/input/test.js"



# chmod a+rx $BASE_DIR/input



# docker run  \

#     --network none \

#     --memory=56m \

#     --cpus=0.5 \

#     --pids-limit=100 \

#     --read-only \

#     --tmpfs /tmp:size=50M,noexec \

#     -v "$BASE_DIR/input:/sandbox/input:ro" \

#     -v "$BASE_DIR/output:/sandbox/output" \

#     --security-opt no-new-privileges \

#     code-executor-nodejs:latest \

#     "test.js"



# echo "Node.js sandbox output:"

# cat "$BASE_DIR/output/result.json"

# echo

# Its creating two input and two output file like this 

# input/

# drwxr-xr-x 1 Ibukun 197121   0 Apr 29 12:47 'input;C'/

# drwxr-xr-x 1 Ibukun 197121   0 Apr 29 12:47  output/

# drwxr-xr-x 1 Ibukun 197121   0 Apr 29 12:47 'output;C'/



# How do I make sure its only creates one input and one output file 

