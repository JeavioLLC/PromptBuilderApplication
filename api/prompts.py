"""
Prompts API endpoints
"""

from flask import Blueprint, request, jsonify
from models import db, Prompt
from models.prompt import Prompt as PromptModel
from models.category import Category as CategoryModel
from api.gemini_llm import generate_prompt

prompts_bp = Blueprint('prompts', __name__, url_prefix='/api/prompts')

@prompts_bp.route('/generate', methods=['POST'])
def generate_prompt_api():
    """Generate a prompt using the LLM (Gemini)"""
    try:
        data = request.get_json() or {}
        user_context = data.get('user_context')
        user_info = data.get('user_info')
        if not user_context:
            return jsonify({'error': 'user_context is required'}), 400
        prompt = generate_prompt(user_context, user_info)
        return jsonify({'generated_prompt': prompt})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('', methods=['GET'])
def get_prompts():
    """Get all prompts with optional filtering"""
    try:
        category_id = request.args.get('category_id', type=int)
        search = request.args.get('search', '')
        
        if category_id and search:
            prompts = PromptModel.search(search, category_id)
        elif category_id:
            prompts = PromptModel.get_by_category(category_id)
        elif search:
            prompts = PromptModel.search(search)
        else:
            prompts = PromptModel.query.all()
        
        return jsonify([prompt.to_dict() for prompt in prompts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('', methods=['POST'])
def create_prompt():
    """Create a new prompt"""
    try:
        data = request.get_json()
        if not data or 'title' not in data or 'content' not in data:
            return jsonify({'error': 'Title and content are required'}), 400
        
        # Validate category exists
        category_id = data.get('category_id', 1)
        category = CategoryModel.query.get(category_id)
        if not category:
            return jsonify({'error': 'Category not found'}), 400
        
        prompt = PromptModel(
            title=data['title'],
            content=data['content'],
            category_id=category_id
        )
        
        # Extract and set variables
        variables = prompt.extract_variables()
        prompt.set_variables(variables)
        
        db.session.add(prompt)
        db.session.commit()
        
        return jsonify(prompt.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/<int:prompt_id>', methods=['GET'])
def get_prompt(prompt_id):
    """Get a specific prompt"""
    try:
        prompt = PromptModel.query.get_or_404(prompt_id)
        return jsonify(prompt.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/<int:prompt_id>', methods=['PUT'])
def update_prompt(prompt_id):
    """Update a prompt"""
    try:
        prompt = PromptModel.query.get_or_404(prompt_id)
        data = request.get_json()
        
        if 'title' in data:
            prompt.title = data['title']
        
        if 'content' in data:
            prompt.content = data['content']
            # Update variables based on new content
            prompt.update_variables()
        
        if 'category_id' in data:
            # Validate category exists
            category = CategoryModel.query.get(data['category_id'])
            if not category:
                return jsonify({'error': 'Category not found'}), 400
            prompt.category_id = data['category_id']
        
        db.session.commit()
        return jsonify(prompt.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/<int:prompt_id>', methods=['DELETE'])
def delete_prompt(prompt_id):
    """Delete a prompt"""
    try:
        prompt = PromptModel.query.get_or_404(prompt_id)
        db.session.delete(prompt)
        db.session.commit()
        
        return jsonify({'message': 'Prompt deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/<int:prompt_id>/use', methods=['POST'])
def use_prompt(prompt_id):
    """Use a prompt with variable substitution"""
    try:
        prompt = PromptModel.query.get_or_404(prompt_id)
        data = request.get_json() or {}
        
        variable_values = data.get('variables', {})
        final_content = prompt.use_with_variables(variable_values)
        
        db.session.commit()
        
        return jsonify({
            'id': prompt.id,
            'title': prompt.title,
            'final_content': final_content,
            'usage_count': prompt.usage_count
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/search', methods=['GET'])
def search_prompts():
    """Search prompts with advanced filtering"""
    try:
        search_term = request.args.get('q', '')
        category_id = request.args.get('category_id', type=int)
        limit = request.args.get('limit', 50, type=int)
        
        prompts = PromptModel.search(search_term, category_id)
        
        # Apply limit
        if limit > 0:
            prompts = prompts[:limit]
        
        return jsonify([prompt.to_dict() for prompt in prompts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/most-used', methods=['GET'])
def get_most_used_prompts():
    """Get most used prompts"""
    try:
        limit = request.args.get('limit', 10, type=int)
        prompts = PromptModel.get_most_used(limit)
        return jsonify([prompt.to_dict() for prompt in prompts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prompts_bp.route('/recent', methods=['GET'])
def get_recent_prompts():
    """Get recently created prompts"""
    try:
        limit = request.args.get('limit', 10, type=int)
        prompts = PromptModel.get_recent(limit)
        return jsonify([prompt.to_dict() for prompt in prompts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
