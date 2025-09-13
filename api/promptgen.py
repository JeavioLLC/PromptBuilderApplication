from flask import Blueprint, request, jsonify
from api.gemini_llm import generate_prompt

promptgen_bp = Blueprint('promptgen', __name__)

@promptgen_bp.route('/api/generate-prompt', methods=['POST'])
def generate_prompt_api():
    data = request.get_json()
    user_context = data.get('context', '')
    if not user_context:
        return jsonify({'error': 'Missing context'}), 400
    prompt = generate_prompt(user_context)
    return jsonify({'prompt': prompt})
