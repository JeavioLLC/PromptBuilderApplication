#!/usr/bin/env python3
"""
Database setup script for Prompt Builder Application
This script helps you set up the PostgreSQL database
"""

import os
import sys
from app import create_app, db
from models.category import Category as CategoryModel
from models.prompt import Prompt as PromptModel

def setup_database():
    """Set up the database with tables and sample data"""
    app = create_app()
    
    with app.app_context():
        print("🗄️  Setting up database...")
        
        # Create all tables
        db.create_all()
        print("✅ Database tables created successfully!")
        
        # Create default category
        default_category = CategoryModel.get_or_create_default()
        print(f"✅ Default category created: {default_category.name}")
        
        # Create sample categories
        sample_categories = [
            {
                'name': 'Email Templates',
                'description': 'Professional email templates for various purposes'
            },
            {
                'name': 'Code Generation',
                'description': 'Prompts for generating code and technical content'
            },
            {
                'name': 'Creative Writing',
                'description': 'Prompts for creative writing and storytelling'
            },
            {
                'name': 'Business',
                'description': 'Business-related prompts and templates'
            }
        ]
        
        for cat_data in sample_categories:
            existing = CategoryModel.query.filter_by(name=cat_data['name']).first()
            if not existing:
                category = CategoryModel(
                    name=cat_data['name'],
                    description=cat_data['description']
                )
                db.session.add(category)
                print(f"✅ Created category: {cat_data['name']}")
        
        # Create sample prompts
        sample_prompts = [
            {
                'title': 'Professional Email Template',
                'content': 'Write a {tone} email to {recipient} regarding {subject}. The email should be {length} and include {specific_details}.',
                'category_name': 'Email Templates'
            },
            {
                'title': 'Code Review Request',
                'content': 'Please review the following {language} code for {project_name}. Focus on {review_aspects} and provide suggestions for {improvement_areas}.',
                'category_name': 'Code Generation'
            },
            {
                'title': 'Story Opening',
                'content': 'Write the opening paragraph of a {genre} story set in {setting}. The main character is a {character_type} who discovers {discovery}.',
                'category_name': 'Creative Writing'
            },
            {
                'title': 'Meeting Agenda',
                'content': 'Create a meeting agenda for {meeting_type} scheduled for {duration}. Include discussion topics: {topics} and expected outcomes: {outcomes}.',
                'category_name': 'Business'
            },
            {
                'title': 'API Documentation',
                'content': 'Generate documentation for the {api_name} API endpoint. Include parameters: {parameters}, response format: {response_format}, and example usage: {example_usage}.',
                'category_name': 'Code Generation'
            }
        ]
        
        for prompt_data in sample_prompts:
            existing = PromptModel.query.filter_by(title=prompt_data['title']).first()
            if not existing:
                category = CategoryModel.query.filter_by(name=prompt_data['category_name']).first()
                if category:
                    prompt = PromptModel(
                        title=prompt_data['title'],
                        content=prompt_data['content'],
                        category_id=category.id
                    )
                    # Extract and set variables
                    variables = prompt.extract_variables()
                    prompt.set_variables(variables)
                    
                    db.session.add(prompt)
                    print(f"✅ Created prompt: {prompt_data['title']}")
        
        # Commit all changes
        db.session.commit()
        print("✅ Sample data created successfully!")
        
        # Display summary
        total_categories = CategoryModel.query.count()
        total_prompts = PromptModel.query.count()
        
        print("\n📊 Database Setup Summary:")
        print(f"   Categories: {total_categories}")
        print(f"   Prompts: {total_prompts}")
        print("\n🚀 Database setup complete! You can now run the application.")

def reset_database():
    """Reset the database (drop all tables and recreate)"""
    app = create_app()
    
    with app.app_context():
        print("⚠️  Resetting database...")
        db.drop_all()
        print("✅ All tables dropped!")
        setup_database()

def main():
    """Main function"""
    print("=" * 60)
    print("🗄️  Prompt Builder Database Setup")
    print("=" * 60)
    
    if len(sys.argv) > 1 and sys.argv[1] == '--reset':
        reset_database()
    else:
        setup_database()
    
    print("\n💡 To reset the database, run: python setup_database.py --reset")
    print("🌐 To start the application, run: python app.py")

if __name__ == '__main__':
    main()
