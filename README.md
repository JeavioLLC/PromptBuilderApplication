# Sarathi

A modern web application for creating, managing, and using AI prompts with dynamic variables. Built with Flask API, PostgreSQL database, and a beautiful responsive UI.

Formerly known as Prompt Builder Application.

## Features

- **Prompt Management**: Create, edit, delete, and organize prompts
- **Category System**: Organize prompts into categories
- **Dynamic Variables**: Use `{variable_name}` syntax for dynamic content
- **Search & Filter**: Find prompts quickly with search functionality
- **Usage Tracking**: Track how often prompts are used
- **Modern UI**: Beautiful, responsive interface with gradient design
- **Real-time Stats**: View total prompts, categories, and usage statistics
- **PostgreSQL Support**: Robust database with PostgreSQL
- **Modular API**: Organized API structure with separate modules
- **RESTful API**: Complete REST API for external integrations

## Project Structure

```
PromptBuilderApplication/
├── api/                    # API modules
│   ├── __init__.py
│   ├── categories.py       # Category API endpoints
│   ├── prompts.py         # Prompt API endpoints
│   └── stats.py           # Statistics API endpoints
├── models/                 # Database models
│   ├── __init__.py
│   ├── database.py        # Database initialization
│   ├── category.py        # Category model
│   └── prompt.py          # Prompt model
├── config/                 # Configuration
│   ├── __init__.py
│   └── database.py        # Database configuration
├── templates/              # Web UI templates
│   └── index.html         # Main application UI
├── app.py                 # Main application file
├── run.py                 # Application runner
├── setup_database.py      # Database setup script
├── requirements.txt       # Python dependencies
├── env.example           # Environment variables example
└── README.md             # This file
```

## Installation

### Prerequisites

- Python 3.7+
- PostgreSQL 12+
- pip (Python package manager)

### Setup Steps

1. **Clone or download the project files**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up PostgreSQL database**:
   ```bash
   # Create database
   createdb prompt_builder
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE prompt_builder;
   ```

4. **Configure environment variables**:
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your database credentials
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=prompt_builder
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   SECRET_KEY=your-secret-key-here
   ```

5. **Set up the database**:
   ```bash
   python setup_database.py
   ```

6. **Run the application**:
   ```bash
   python run.py
   ```

7. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

### Creating Categories
1. Click "New Category" in the sidebar
2. Enter a name and optional description
3. Click "Save Category"

### Creating Prompts
1. Click "New Prompt" in the sidebar
2. Fill in the title and content
3. Select a category
4. Use `{variable_name}` syntax for dynamic variables
5. Click "Save Prompt"

### Using Prompts
1. Click "Use" on any prompt
2. Fill in the variable values if the prompt has variables
3. Click "Generate Prompt" to see the final result
4. Copy the generated prompt for use

### Managing Prompts
- **Edit**: Click the "Edit" button to modify a prompt
- **Delete**: Click the "Delete" button to remove a prompt
- **Search**: Use the search box to find specific prompts
- **Filter by Category**: Click on a category to filter prompts

## API Endpoints

The application provides a comprehensive RESTful API organized into modules:

### Categories API (`/api/categories`)
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/<id>` - Get a specific category
- `PUT /api/categories/<id>` - Update a category
- `DELETE /api/categories/<id>` - Delete a category
- `GET /api/categories/<id>/prompts` - Get prompts in a category

### Prompts API (`/api/prompts`)
- `GET /api/prompts` - List all prompts (supports `category_id` and `search` query parameters)
- `POST /api/prompts` - Create a new prompt
- `GET /api/prompts/<id>` - Get a specific prompt
- `PUT /api/prompts/<id>` - Update a prompt
- `DELETE /api/prompts/<id>` - Delete a prompt
- `POST /api/prompts/<id>/use` - Use a prompt with variables
- `GET /api/prompts/search` - Advanced search with filtering
- `GET /api/prompts/most-used` - Get most used prompts
- `GET /api/prompts/recent` - Get recently created prompts

### Statistics API (`/api/stats`)
- `GET /api/stats` - Get overall application statistics
- `GET /api/stats/usage` - Get usage statistics
- `GET /api/stats/prompts/trending` - Get trending prompts

### Health Check
- `GET /health` - Application health check

## Variable System

The application supports dynamic variables in prompts using the `{variable_name}` syntax:

**Example Prompt:**
```
Write a {tone} email to {recipient} about {subject}. 
Make it {length} and include {specific_details}.
```

**When using the prompt, you'll be asked to fill in:**
- `tone`: professional, casual, friendly
- `recipient`: client, colleague, friend
- `subject`: project update, meeting request, etc.
- `length`: short, medium, long
- `specific_details`: any specific information to include

## Database

The application uses PostgreSQL for data storage with the following schema:

### Database Schema

**Categories Table:**
- `id` (Primary Key)
- `name` (Unique)
- `description`
- `created_at`

**Prompts Table:**
- `id` (Primary Key)
- `title`
- `content`
- `variables` (JSON string)
- `category_id` (Foreign Key)
- `created_at`
- `updated_at`
- `usage_count`

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prompt_builder
DB_USER=postgres
DB_PASSWORD=your_password_here

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
```

### Database Configuration

The application supports different database configurations:
- **Development**: PostgreSQL with debug mode
- **Production**: PostgreSQL with production settings
- **Testing**: SQLite in-memory database

## API Usage Examples

### Using the API with curl

```bash
# Get all categories
curl http://localhost:5000/api/categories

# Create a new category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Marketing", "description": "Marketing prompts"}'

# Get all prompts
curl http://localhost:5000/api/prompts

# Create a new prompt
curl -X POST http://localhost:5000/api/prompts \
  -H "Content-Type: application/json" \
  -d '{"title": "Email Template", "content": "Write a {tone} email about {subject}", "category_id": 1}'

# Use a prompt with variables
curl -X POST http://localhost:5000/api/prompts/1/use \
  -H "Content-Type: application/json" \
  -d '{"variables": {"tone": "professional", "subject": "project update"}}'
```

## Customization

### Styling
The UI uses CSS custom properties and can be easily customized by modifying the styles in `templates/index.html`.

### Database
To use a different database, modify the configuration in `config/database.py`.

### API
The API can be extended by adding new modules in the `api/` directory and registering them in `app.py`.

## Troubleshooting

### Common Issues

1. **PostgreSQL connection error**: 
   - Ensure PostgreSQL is running
   - Check database credentials in `.env` file
   - Verify database exists

2. **Port already in use**: 
   - Change the port in `run.py` or `app.py`

3. **Database setup issues**: 
   - Run `python setup_database.py --reset` to reset the database
   - Check PostgreSQL logs for errors

4. **CORS issues**: 
   - The application includes CORS headers for API access

### Development

For development, the application runs in debug mode by default. To disable debug mode, set `FLASK_ENV=production` in your `.env` file.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.