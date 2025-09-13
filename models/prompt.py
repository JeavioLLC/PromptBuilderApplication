"""
Prompt model for storing AI prompts
"""
import json
import re
from datetime import datetime
from .database import db

class Prompt(db.Model):
    """Prompt model for storing AI prompts with variables"""
    __tablename__ = 'prompts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    variables = db.Column(db.Text)  # JSON string of variables
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    usage_count = db.Column(db.Integer, default=0)
    
    def __repr__(self):
        return f'<Prompt {self.title}>'
    
    def to_dict(self):
        """Convert prompt to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'variables': self.get_variables(),
            'category_id': self.category_id,
            'category_name': self.category.name if self.category else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'usage_count': self.usage_count
        }
    
    def get_variables(self):
        """Get variables as a list"""
        if self.variables:
            try:
                return json.loads(self.variables)
            except json.JSONDecodeError:
                return []
        return []
    
    def set_variables(self, variables_list):
        """Set variables from a list"""
        self.variables = json.dumps(variables_list)
    
    def extract_variables(self):
        """Extract variables from content using regex"""
        variables = re.findall(r'\{([^}]+)\}', self.content)
        return list(set(variables))  # Remove duplicates
    
    def update_variables(self):
        """Update variables based on current content"""
        variables = self.extract_variables()
        self.set_variables(variables)
        return variables
    
    def use_with_variables(self, variable_values=None):
        """Use prompt with variable substitution"""
        if not variable_values:
            variable_values = {}
        
        content = self.content
        for var_name, var_value in variable_values.items():
            content = content.replace(f'{{{var_name}}}', str(var_value))
        
        # Increment usage count
        self.usage_count += 1
        
        return content
    
    @classmethod
    def search(cls, search_term, category_id=None):
        """Search prompts by title or content"""
        query = cls.query
        
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        if search_term:
            query = query.filter(
                db.or_(
                    cls.title.contains(search_term),
                    cls.content.contains(search_term)
                )
            )
        
        return query.all()
    
    @classmethod
    def get_by_category(cls, category_id):
        """Get all prompts in a category"""
        return cls.query.filter_by(category_id=category_id).all()
    
    @classmethod
    def get_most_used(cls, limit=10):
        """Get most used prompts"""
        return cls.query.order_by(cls.usage_count.desc()).limit(limit).all()
    
    @classmethod
    def get_recent(cls, limit=10):
        """Get recently created prompts"""
        return cls.query.order_by(cls.created_at.desc()).limit(limit).all()
