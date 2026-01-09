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
| GET | `/post?sender=<sender_id>` | Get all posts by a specific sender |
| GET | `/post/:id` | Get a post by ID |
| PUT | `/post/:id` | Update a post |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/comment` | Create a new comment |
| GET | `/comment` | Get all comments |
| GET | `/comment?post=<post_id>` | Get all comments for a specific post |
| GET | `/comment/:id` | Get a comment by ID |
| PUT | `/comment/:id` | Update a comment |
| DELETE | `/comment/:id` | Delete a comment |

## Testing

Use the `request.rest` file with the REST Client extension in VS Code to test the API endpoints.
