from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

#importado de la pagina
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import make_response
import jwt

app = Flask(__name__)
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(20), nullable=False)
    avatar = db.Column(db.String(200), nullable=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(100), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', backref=db.backref('posts', lazy=True))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    location = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    likes = db.relationship('User', secondary=likes, backref=db.backref('liked_posts', lazy='dynamic'))

@app.route('/')
def index():
    return "Digital Teach Inc!"

@app.route('/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    author = User.query.get(data['author_id'])
    if not author:
        return jsonify({'message': 'Author not found'}), 404
    new_post = Post(image=data['image'], message=data['message'], author=author, location=data['location'], status=data['status'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post added successfully'}), 201

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{
        'id': post.id,
        'image': post.image,
        'message': post.message,
        'author': {
            'id': post.author.id,
            'username': post.author.username,
            'name': post.author.name,
            'surname': post.author.surname,
            'avatar': post.author.avatar
        },
        'created_at': post.created_at,
        'location': post.location,
        'status': post.status,
        'likes': [{'id': user.id, 'username': user.username} for user in post.likes]
    } for post in posts])

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'name': user.name,
        'surname': user.surname,
        'avatar': user.avatar
    } for user in users])

@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], password=data['password'], name=data['name'], surname=data['surname'], avatar=data.get('avatar'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Buscar usuario por nombre de usuario
    user = User.query.filter_by(username=username).first()
    
    if user and user.password == password:
        return jsonify({'message': 'Login successful', 'user': {
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'surname': user.surname,
            'avatar': user.avatar
        }}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
