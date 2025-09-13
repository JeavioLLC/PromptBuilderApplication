#!/usr/bin/env python3
"""
Prompt Builder Application Runner
This script provides an easy way to run the Prompt Builder application.
"""

import os
import sys
from app import create_app
PORT = int(os.getenv('PORT', '5000'))
HOST = os.getenv('HOST', '0.0.0.0')

def main():
    """Main function to run the application."""
    print("=" * 60)
    print("🚀 Prompt Builder Application")
    print("=" * 60)
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Create application
    app = create_app()
    
    print("\n📊 Application Features:")
    print("• Create and manage AI prompts")
    print("• Organize prompts into categories")
    print("• Use dynamic variables in prompts")
    print("• Search and filter prompts")
    print("• Track usage statistics")
    print("• PostgreSQL database support")
    print("• Modular API structure")
    
    print("\n🔧 API Endpoints:")
    print("• Categories: /api/categories")
    print("• Prompts: /api/prompts")
    print("• Statistics: /api/stats")
    print("• Health Check: /health")
    
    print("\n🌐 Starting server...")
    print(f"📍 Application URL: http://localhost:{PORT}")
    print(f"🔧 API Base URL: http://localhost:{PORT}/api")
    print("\n💡 Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        app.run(debug=True, host=HOST, port=PORT)
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        print("\n💡 Make sure PostgreSQL is running and configured correctly.")
        print("   Check your database credentials in the environment variables.")
        sys.exit(1)

if __name__ == '__main__':
    main()
