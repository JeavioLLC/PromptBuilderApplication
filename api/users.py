from flask import Blueprint, jsonify
from models.user import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([
        {'id': u.id, 'email': u.email, 'name': u.name} for u in users
    ])
