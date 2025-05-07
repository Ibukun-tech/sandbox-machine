# Real-Time Code Collaborations

A powerful real-time code collaboration platform built with NestJS that allows developers to collaborate, execute code in isolated environments, and share results in real-time.

## Features

- **Real-time Code Collaboration**: Work together with other developers in real-time
- **Secure Code Execution**: Run code in isolated Docker containers for security
- **Multi-language Support**: Execute code in multiple programming languages:
  - JavaScript/Node.js
  - Python
  - Go
- **Queue Management**: Efficient code execution queue using BullMQ and Redis
- **API Documentation**: Swagger UI for easy API exploration
- **Authentication**: Secure user authentication system
- **Database Integration**: PostgreSQL database for persistent storage

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- Redis
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd real-time-code-collaborations
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DOCKER_PATH=./tmp/code-executions
REDIS_HOST=localhost
REDIS_PORT=6379
DB_NAME=sandbox_db
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=secret
```

## Running the Application

### Start Required Services

Start Redis and PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- PostgreSQL database on port 5432
- Redis server on port 6379

### Start the Application

Development mode:

```bash
yarn start:dev
# or
npm run start:dev
```

Production mode:

```bash
yarn build
yarn start:prod
# or
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/docs/v1
```

## Code Execution

The platform supports executing code in isolated Docker containers. The supported languages are:

- Node.js
- Python
- Go

The code execution service uses Docker containers to run code securely and BullMQ with Redis for queue management to handle multiple execution requests efficiently.

## Project Structure

```
├── src/
│   ├── modules/
│   │   ├── Docker/         # Docker integration for code execution
│   │   ├── auth/           # Authentication module
│   │   ├── database/       # Database and queue configuration
│   │   └── guard/          # Authorization guards
│   ├── config/             # Application configuration
│   └── main.ts             # Application entry point
├── sandbox/                # Docker container configurations for code execution
│   ├── golang/             # Go execution environment
│   ├── nodejs/             # Node.js execution environment
│   └── python/             # Python execution environment
└── Docker-compose.yml      # Docker Compose configuration for services
```

## Development

### Testing

Run tests:

```bash
yarn test
# or
npm run test
```

Run end-to-end tests:

```bash
yarn test:e2e
# or
npm run test:e2e
```

### Building Docker Images for Code Execution

To build the Docker images for code execution:

```bash
# For all languages
sh script/build-images.sh

# For Go specifically
sh script/build-images-go.sh
```

## License

[UNLICENSED]
