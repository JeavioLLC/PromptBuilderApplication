"""
Statistics API endpoints
"""
from flask import Blueprint, jsonify
from models import db, Category, Prompt
from models.category import Category as CategoryModel
from models.prompt import Prompt as PromptModel
from sqlalchemy import func

stats_bp = Blueprint('stats', __name__, url_prefix='/api/stats')

@stats_bp.route('', methods=['GET'])
def get_stats():
    """Get overall application statistics"""
    try:
        # Total counts
        total_categories = CategoryModel.query.count()
        total_prompts = PromptModel.query.count()
        total_usage = db.session.query(func.sum(PromptModel.usage_count)).scalar() or 0
        
        # Recent activity
        recent_prompts = PromptModel.query.order_by(PromptModel.created_at.desc()).limit(5).all()
        most_used_prompts = PromptModel.query.order_by(PromptModel.usage_count.desc()).limit(5).all()
        
        # Category breakdown
        category_stats = db.session.query(
            CategoryModel.name,
            func.count(PromptModel.id).label('prompt_count'),
            func.sum(PromptModel.usage_count).label('total_usage')
        ).outerjoin(PromptModel).group_by(CategoryModel.id, CategoryModel.name).all()
        
        return jsonify({
            'overview': {
                'total_categories': total_categories,
                'total_prompts': total_prompts,
                'total_usage': int(total_usage)
            },
            'recent_prompts': [prompt.to_dict() for prompt in recent_prompts],
            'most_used_prompts': [prompt.to_dict() for prompt in most_used_prompts],
            'category_breakdown': [
                {
                    'category_name': stat.name,
                    'prompt_count': stat.prompt_count,
                    'total_usage': int(stat.total_usage or 0)
                }
                for stat in category_stats
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stats_bp.route('/usage', methods=['GET'])
def get_usage_stats():
    """Get usage statistics"""
    try:
        # Daily usage (last 30 days)
        daily_usage = db.session.query(
            func.date(PromptModel.updated_at).label('date'),
            func.sum(PromptModel.usage_count).label('usage')
        ).filter(
            PromptModel.updated_at >= func.date_sub(func.now(), 30)
        ).group_by(func.date(PromptModel.updated_at)).all()
        
        # Category usage
        category_usage = db.session.query(
            CategoryModel.name,
            func.sum(PromptModel.usage_count).label('total_usage'),
            func.avg(PromptModel.usage_count).label('avg_usage')
        ).join(PromptModel).group_by(CategoryModel.id, CategoryModel.name).all()
        
        return jsonify({
            'daily_usage': [
                {
                    'date': str(stat.date),
                    'usage': int(stat.usage or 0)
                }
                for stat in daily_usage
            ],
            'category_usage': [
                {
                    'category_name': stat.name,
                    'total_usage': int(stat.total_usage or 0),
                    'average_usage': float(stat.avg_usage or 0)
                }
                for stat in category_usage
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stats_bp.route('/prompts/trending', methods=['GET'])
def get_trending_prompts():
    """Get trending prompts based on recent usage"""
    try:
        limit = request.args.get('limit', 10, type=int)
        
        # Get prompts with usage in the last 7 days
        trending_prompts = PromptModel.query.filter(
            PromptModel.updated_at >= func.date_sub(func.now(), 7)
        ).order_by(PromptModel.usage_count.desc()).limit(limit).all()
        
        return jsonify([prompt.to_dict() for prompt in trending_prompts])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
