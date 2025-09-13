"""
Prompt Builder Application - Main Application File
"""
import os
from flask import Flask, render_template
from flask_cors import CORS
from models import db
from models.category import Category as CategoryModel
from config import config

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    config_name = config_name or os.getenv('FLASK_ENV', 'default')
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    from api import categories_bp, prompts_bp, stats_bp, auth_bp, promptgen_bp, users_bp
    app.register_blueprint(categories_bp)
    app.register_blueprint(prompts_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(promptgen_bp)
    app.register_blueprint(users_bp)
    
    # Routes
    @app.route('/')
    def index():
        """Main application page"""
        return render_template('index.html')
    
    @app.route('/health')
    def health_check():
        """Health check endpoint"""
        return {'status': 'healthy', 'message': 'Prompt Builder API is running'}
    
    # Database initialization (Flask 2.3+ removed before_first_request)
    with app.app_context():
        db.create_all()
        # Create default category if none exists
        CategoryModel.get_or_create_default()
    
    return app

# Create the application instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Create default category if none exists
        CategoryModel.get_or_create_default()
    
    app.run(debug=True, host='0.0.0.0', port=5000)