from flask import Flask
from flask_cors import CORS
from db import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///erp_mini.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'dev-secret'
    # Permite CORS apenas do frontend
    CORS(app, origins=["http://localhost:5173"])
    db.init_app(app)

    from models import Product, Customer, Sale, SaleItem, seed
    from routes import register_routes
    register_routes(app, db)

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
        from models import seed
        seed(db)
    app.run(debug=True, host="0.0.0.0", port=5000)

