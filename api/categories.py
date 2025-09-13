"""
Categories API endpoints
"""
from flask import Blueprint, request, jsonify
from models import db, Category
from models.category import Category as CategoryModel

categories_bp = Blueprint('categories', __name__, url_prefix='/api/categories')

@categories_bp.route('', methods=['GET'])
def get_categories():
    """Get all categories"""
    try:
        categories = CategoryModel.query.all()
        return jsonify([category.to_dict() for category in categories])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@categories_bp.route('', methods=['POST'])
def create_category():
    """Create a new category"""
    try:
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify({'error': 'Name is required'}), 400
        
        # Check if category already exists
        if CategoryModel.query.filter_by(name=data['name']).first():
            return jsonify({'error': 'Category already exists'}), 400
        
        category = CategoryModel(
            name=data['name'],
            description=data.get('description', '')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify(category.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """Get a specific category"""
    try:
        category = CategoryModel.query.get_or_404(category_id)
        return jsonify(category.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@categories_bp.route('/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    """Update a category"""
    try:
        category = CategoryModel.query.get_or_404(category_id)
        data = request.get_json()
        
        if 'name' in data:
            # Check if new name already exists
            existing = CategoryModel.query.filter_by(name=data['name']).first()
            if existing and existing.id != category_id:
                return jsonify({'error': 'Category name already exists'}), 400
            category.name = data['name']
        
        if 'description' in data:
            category.description = data['description']
        
        db.session.commit()
        return jsonify(category.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@categories_bp.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    """Delete a category"""
    try:
        category = CategoryModel.query.get_or_404(category_id)
        
        # Check if category has prompts
        if category.prompts:
            return jsonify({'error': 'Cannot delete category with prompts. Move or delete prompts first.'}), 400
        
        db.session.delete(category)
        db.session.commit()
        
        return jsonify({'message': 'Category deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@categories_bp.route('/<int:category_id>/prompts', methods=['GET'])
def get_category_prompts(category_id):
    """Get all prompts in a category"""
    try:
        category = CategoryModel.query.get_or_404(category_id)
        prompts = [prompt.to_dict() for prompt in category.prompts]
        return jsonify(prompts)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
