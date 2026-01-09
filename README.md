# Posts REST API

A REST API built with Node.js, Express, and MongoDB for managing posts.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Make sure MongoDB is running locally

4. Start the server:
```bash
npm start
```

## API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/post` | Add a new post |
| GET | `/post` | Get all posts |
| GET | `/post/:id` | Get a post by ID |

## Testing

Use the `request.rest` file with the REST Client extension in VS Code to test the API endpoints.
