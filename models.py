from db import db
from datetime import datetime

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    sku = db.Column(db.String(50), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    email = db.Column(db.String(140))

class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    total = db.Column(db.Float, default=0.0)
    customer = db.relationship('Customer', backref='sales')

class SaleItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sale_id = db.Column(db.Integer, db.ForeignKey('sale.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    qty = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    product = db.relationship('Product')
    sale = db.relationship('Sale', backref='items')

def seed(db):
    if Product.query.count() == 0:
        p1 = Product(name="Camiseta", sku="CAM001", price=39.90, stock=10)
        p2 = Product(name="Caneca", sku="CAN001", price=19.90, stock=20)
        db.session.add_all([p1,p2])
        db.session.commit()
    if Customer.query.count() == 0:
        db.session.add_all([Customer(name="Ana Silva", email="ana@ex.com"),
                            Customer(name="Loja XP", email="contato@xp.com")])
        db.session.commit()
