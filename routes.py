from flask import jsonify, request
from models import Product, Customer, Sale, SaleItem

def register_routes(app, db):
    # API REST - Produtos
    @app.route('/api/products', methods=['GET'])
    def api_products():
        products = Product.query.all()
        return jsonify([
            {
                'id': p.id,
                'name': p.name,
                'sku': p.sku,
                'price': p.price,
                'stock': p.stock
            } for p in products
        ])

    @app.route('/api/products', methods=['POST'])
    def api_add_product():
        data = request.json
        p = Product(
            name=data['name'],
            sku=data['sku'],
            price=float(data['price']),
            stock=int(data['stock'])
        )
        db.session.add(p)
        db.session.commit()
        return jsonify({'message': 'Produto adicionado!', 'id': p.id}), 201

    @app.route('/api/products/<int:pid>', methods=['PUT'])
    def api_edit_product(pid):
        p = Product.query.get_or_404(pid)
        data = request.json
        p.name = data['name']
        p.sku = data['sku']
        p.price = float(data['price'])
        p.stock = int(data['stock'])
        db.session.commit()
        return jsonify({'message': 'Produto atualizado!'})

    @app.route('/api/products/<int:pid>', methods=['DELETE'])
    def api_delete_product(pid):
        p = Product.query.get_or_404(pid)
        db.session.delete(p)
        db.session.commit()
        return jsonify({'message': 'Produto removido!'})

    # API REST - Customers
    @app.route('/api/customers', methods=['GET'])
    def api_customers():
        customers = Customer.query.all()
        return jsonify([
            {
                'id': c.id,
                'name': c.name,
                'email': c.email
            } for c in customers
        ])

    @app.route('/api/customers', methods=['POST'])
    def api_add_customer():
        data = request.json
        c = Customer(
            name=data['name'],
            email=data.get('email')
        )
        db.session.add(c)
        db.session.commit()
        return jsonify({'message': 'Cliente adicionado!', 'id': c.id}), 201

    @app.route('/api/customers/<int:cid>', methods=['PUT'])
    def api_edit_customer(cid):
        c = Customer.query.get_or_404(cid)
        data = request.json
        c.name = data['name']
        c.email = data.get('email')
        db.session.commit()
        return jsonify({'message': 'Cliente atualizado!'})

    @app.route('/api/customers/<int:cid>', methods=['DELETE'])
    def api_delete_customer(cid):
        c = Customer.query.get_or_404(cid)
        db.session.delete(c)
        db.session.commit()
        return jsonify({'message': 'Cliente removido!'})

    # ...existing code para rotas HTML se quiser manter...

