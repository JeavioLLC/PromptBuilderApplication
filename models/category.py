"""
Category model for organizing prompts
"""
from datetime import datetime
from .database import db

class Category(db.Model):
    """Category model for organizing prompts"""
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with prompts
    prompts = db.relationship('Prompt', backref='category', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Category {self.name}>'
    
    def to_dict(self):
        """Convert category to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'prompt_count': len(self.prompts)
        }
    
    @classmethod
    def get_by_name(cls, name):
        """Get category by name"""
        return cls.query.filter_by(name=name).first()
    
    @classmethod
    def get_or_create_default(cls):
        """Get or create default category"""
        default_category = cls.get_by_name('General')
        if not default_category:
            default_category = cls(
                name='General',
                description='General purpose prompts'
            )
            db.session.add(default_category)
            db.session.commit()
        return default_category
