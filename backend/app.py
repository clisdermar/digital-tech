from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
db = SQLAlchemy(app)
jwt = JWTManager(app)

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

@app.route("/register", methods=["POST"])
def register_user():
    register_data = request.json
    username = register_data.get('username')
    password = register_data.get('password')
    name = register_data.get('name')
    surname = register_data.get('surname')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username, password=password, name=name, surname=surname)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error registering user: {str(e)}'}), 500

@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_data = request.json
    user.username = user_data.get('username', user.username)
    user.password = user_data.get('password', user.password)
    user.name = user_data.get('name', user.name)
    user.surname = user_data.get('surname', user.surname)

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully', 'user': {
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'surname': user.surname
        }}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error updating user: {str(e)}'}), 500

@app.route('/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    username = data.get('username')  # Obtén el nombre de usuario del cuerpo de la solicitud
    
    author = User.query.filter_by(username=username).first()
    if not author:
        return jsonify({'message': 'Author not found'}), 404
    
    new_post = Post(
        image=data['image'],
        message=data['message'],
        author=author,
        location=data['location'],
        status=data['status']
    )
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

if __name__ == '__main__':
    app.run(debug=True)
