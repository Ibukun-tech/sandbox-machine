FROM golang:1.20

# Set up working directory structure
WORKDIR /sandbox
RUN mkdir -p /sandbox/input /sandbox/output

# Copy execution wrapper
COPY runner.go /sandbox/

#Then build the file because b
RUN go build -o /sandbox/runner /sandbox/runner.go

ENTRYPOINT ["/sandbox/runner"]