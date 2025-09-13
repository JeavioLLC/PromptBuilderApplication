from flask import Blueprint, request, jsonify, session
from api.gemini_llm import generate_prompt
from models.user import User

promptgen_bp = Blueprint('promptgen', __name__)

@promptgen_bp.route('/api/generate-prompt', methods=['POST'])
def generate_prompt_api():
    data = request.get_json()
    user_context = data.get('context', '')
    user_info = data.get('user', {})
    # Optionally, get user from session if not provided
    if not user_info and 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            user_info = {'email': user.email, 'name': getattr(user, 'name', None)}
    prompt = generate_prompt(user_context, user_info)
    return jsonify({'prompt': prompt})
