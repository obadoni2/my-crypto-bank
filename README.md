# My Crypto Bank

A full-stack cryptocurrency project built with React (frontend) and Python Flask (backend).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Python 3.12
- Poetry (Python package manager)
- Redis server (for session management)

## Project Structure

```
my-crypto-bank/
├── frontend/          # React application
│   ├── src/          # React source files
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
└── backend/          # Flask API server
    ├── controllers/  # Route handlers
    ├── models/       # Database models
    ├── main.py      # Application entry point
    ├── config.py    # Configuration settings
    └── pyproject.toml # Backend dependencies
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies using Poetry:
```bash
poetry install
```

3. Create a `.env` file in the backend directory with the following variables:
```
SECRET_KEY=your_secret_key_here
JWT_SECRET_KEY=your_jwt_secret_key_here
FLASK_APP=main.py
FLASK_ENV=development
REDIS_URL=redis://localhost:6379
```

4. Initialize the database:
```bash
poetry run python main.py init
```

5. Start the Flask server:
```bash
poetry run python main.py run
```

### Backend CLI Commands
The backend includes several CLI commands for management:

- `python main.py run [--debug] [--port PORT]` - Start the server
- `python main.py init` - Initialize the database
- `python main.py wipe` - Wipe the database
- `python main.py --help` - Show help message

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The React application will start at `http://localhost:3000`

## API Endpoints

The backend provides several API endpoints:

- `/auth/*` - Authentication routes
- `/crypto/*` - Cryptocurrency-related operations
- `/transaction/*` - Transaction management
- `/account/*` - Account management

## Technologies Used

### Frontend
- React 17
- React Router DOM v6
- Axios for API requests
- Chart.js for data visualization
- Moment.js for date handling

### Backend
- Flask with async support
- Flask-SQLAlchemy for database management
- Flask-JWT-Extended for authentication
- Redis for session management
- Flask-CORS for handling cross-origin requests
- Flask-Mail for email functionality
- Flask-Marshmallow for serialization

## Development Features

### Backend Features
- CLI interface for database management
- JWT authentication
- Session management with Redis
- CORS support
- Email functionality
- Database ORM with SQLAlchemy

### Frontend Features
- Modern React with hooks
- Chart visualization
- Responsive design
- Route protection
- API integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. Redis Connection:
   - Ensure Redis server is running locally
   - Check Redis connection URL in `.env`

2. Database Issues:
   - Run `python main.py init` to initialize the database
   - Use `python main.py wipe` to reset if needed

3. Frontend API Connection:
   - Verify backend is running on correct port
   - Check CORS settings if experiencing connection issues
