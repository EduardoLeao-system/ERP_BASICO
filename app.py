
from flask import Flask, render_template_string, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///erp_mini.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'dev-secret'  # só para brincar

db = SQLAlchemy(app)

##########
# Models
##########
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

##########
# Routes
##########
HOME = """
<!doctype html>
<title>ERP Mini</title>
<h1>ERP Mini — Painel</h1>
<ul>
  <li><a href="{{ url_for('list_products') }}">Produtos</a></li>
  <li><a href="{{ url_for('list_customers') }}">Clientes</a></li>
  <li><a href="{{ url_for('new_sale') }}">Fazer Venda</a></li>
  <li><a href="{{ url_for('report') }}">Relatório de Vendas</a></li>
</ul>
"""

@app.route('/')
def index():
    return render_template_string(HOME)

# Products
PRODUCTS = """
<!doctype html>
<title>Produtos</title>
<h1>Produtos</h1>
<a href="{{ url_for('index') }}">← Voltar</a> |
<a href="{{ url_for('add_product') }}">Adicionar produto</a>
<table border=1 cellpadding=6>
<tr><th>ID</th><th>Nome</th><th>SKU</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr>
{% for p in products %}
<tr>
  <td>{{ p.id }}</td>
  <td>{{ p.name }}</td>
  <td>{{ p.sku }}</td>
  <td>R$ {{ '%.2f' % p.price }}</td>
  <td>{{ p.stock }}</td>
  <td>
    <a href="{{ url_for('edit_product', pid=p.id) }}">editar</a> |
    <a href="{{ url_for('delete_product', pid=p.id) }}">deletar</a>
  </td>
</tr>
{% endfor %}
</table>
"""

PRODUCT_FORM = """
<!doctype html>
<title>{{ 'Editar' if product else 'Adicionar' }} Produto</title>
<h1>{{ 'Editar' if product else 'Adicionar' }} Produto</h1>
<a href="{{ url_for('list_products') }}">← Voltar</a>
<form method="post">
  Nome: <input name="name" required value="{{ product.name if product else '' }}"><br>
  SKU: <input name="sku" required value="{{ product.sku if product else '' }}"><br>
  Preço: <input name="price" type="number" step="0.01" required value="{{ product.price if product else '0.00' }}"><br>
  Estoque: <input name="stock" type="number" required value="{{ product.stock if product else '0' }}"><br>
  <button type="submit">Salvar</button>
</form>
"""

@app.route('/products')
def list_products():
    products = Product.query.all()
    return render_template_string(PRODUCTS, products=products)

@app.route('/products/add', methods=['GET','POST'])
def add_product():
    if request.method == 'POST':
        p = Product(
            name=request.form['name'],
            sku=request.form['sku'],
            price=float(request.form['price']),
            stock=int(request.form['stock'])
        )
        db.session.add(p)
        db.session.commit()
        flash('Produto adicionado!')
        return redirect(url_for('list_products'))
    return render_template_string(PRODUCT_FORM, product=None)

@app.route('/products/<int:pid>/edit', methods=['GET','POST'])
def edit_product(pid):
    p = Product.query.get_or_404(pid)
    if request.method == 'POST':
        p.name = request.form['name']
        p.sku = request.form['sku']
        p.price = float(request.form['price'])
        p.stock = int(request.form['stock'])
        db.session.commit()
        flash('Produto atualizado!')
        return redirect(url_for('list_products'))
    return render_template_string(PRODUCT_FORM, product=p)

@app.route('/products/<int:pid>/delete')
def delete_product(pid):
    p = Product.query.get_or_404(pid)
    db.session.delete(p)
    db.session.commit()
    flash('Produto removido!')
    return redirect(url_for('list_products'))

# Customers
CUSTOMERS = """
<!doctype html>
<title>Clientes</title>
<h1>Clientes</h1>
<a href="{{ url_for('index') }}">← Voltar</a> |
<a href="{{ url_for('add_customer') }}">Adicionar cliente</a>
<table border=1 cellpadding=6>
<tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr>
{% for c in customers %}
<tr>
  <td>{{ c.id }}</td>
  <td>{{ c.name }}</td>
  <td>{{ c.email or '' }}</td>
  <td>
    <a href="{{ url_for('edit_customer', cid=c.id) }}">editar</a> |
    <a href="{{ url_for('delete_customer', cid=c.id) }}">deletar</a>
  </td>
</tr>
{% endfor %}
</table>
"""

CUSTOMER_FORM = """
<!doctype html>
<title>{{ 'Editar' if customer else 'Adicionar' }} Cliente</title>
<h1>{{ 'Editar' if customer else 'Adicionar' }} Cliente</h1>
<a href="{{ url_for('list_customers') }}">← Voltar</a>
<form method="post">
  Nome: <input name="name" required value="{{ customer.name if customer else '' }}"><br>
  Email: <input name="email" value="{{ customer.email if customer else '' }}"><br>
  <button type="submit">Salvar</button>
</form>
"""

@app.route('/customers')
def list_customers():
    customers = Customer.query.all()
    return render_template_string(CUSTOMERS, customers=customers)

@app.route('/customers/add', methods=['GET','POST'])
def add_customer():
    if request.method == 'POST':
        c = Customer(name=request.form['name'], email=request.form.get('email'))
        db.session.add(c)
        db.session.commit()
        flash('Cliente adicionado!')
        return redirect(url_for('list_customers'))
    return render_template_string(CUSTOMER_FORM, customer=None)

@app.route('/customers/<int:cid>/edit', methods=['GET','POST'])
def edit_customer(cid):
    c = Customer.query.get_or_404(cid)
    if request.method == 'POST':
        c.name = request.form['name']
        c.email = request.form.get('email')
        db.session.commit()
        flash('Cliente atualizado!')
        return redirect(url_for('list_customers'))
    return render_template_string(CUSTOMER_FORM, customer=c)

@app.route('/customers/<int:cid>/delete')
def delete_customer(cid):
    c = Customer.query.get_or_404(cid)
    db.session.delete(c)
    db.session.commit()
    flash('Cliente removido!')
    return redirect(url_for('list_customers'))

# Sales
SALE_FORM = """
<!doctype html>
<title>Nova Venda</title>
<h1>Nova Venda</h1>
<a href="{{ url_for('index') }}">← Voltar</a>
<form method="post">
  Cliente:
  <select name="customer_id" required>
    <option value="">-- selecione --</option>
    {% for c in customers %}
      <option value="{{ c.id }}">{{ c.name }}</option>
    {% endfor %}
  </select>
  <h3>Itens</h3>
  <table border=1 cellpadding=6>
    <tr><th>Produto</th><th>Preço</th><th>Quantidade</th></tr>
    {% for p in products %}
    <tr>
      <td>{{ p.name }}</td>
      <td>R$ {{ '%.2f' % p.price }}</td>
      <td><input type="number" name="qty_{{ p.id }}" min="0" value="0"></td>
    </tr>
    {% endfor %}
  </table>
  <button type="submit">Finalizar Venda</button>
</form>
"""

@app.route('/sales/new', methods=['GET','POST'])
def new_sale():
    products = Product.query.all()
    customers = Customer.query.all()
    if request.method == 'POST':
        cid = int(request.form['customer_id'])
        sale = Sale(customer_id=cid, total=0.0)
        db.session.add(sale)
        total = 0.0
        for p in products:
            qty = int(request.form.get(f'qty_{p.id}', 0) or 0)
            if qty > 0:
                if p.stock < qty:
                    db.session.rollback()
                    flash(f'Estoque insuficiente para {p.name} (disponível: {p.stock})')
                    return redirect(url_for('new_sale'))
                item = SaleItem(sale=sale, product_id=p.id, qty=qty, price=p.price)
                p.stock -= qty
                total += qty * p.price
                db.session.add(item)
        if not sale.items:
            db.session.rollback()
            flash('Nenhum item selecionado.')
            return redirect(url_for('new_sale'))
        sale.total = total
        db.session.commit()
        flash(f'Venda registrada! Total R$ {total:.2f}')
        return redirect(url_for('index'))
    return render_template_string(SALE_FORM, products=products, customers=customers)

# Report
REPORT = """
<!doctype html>
<title>Relatório</title>
<h1>Relatório de Vendas</h1>
<a href="{{ url_for('index') }}">← Voltar</a>
<table border=1 cellpadding=6>
<tr><th>ID</th><th>Data</th><th>Cliente</th><th>Total</th><th>Itens</th></tr>
{% for s in sales %}
<tr>
  <td>{{ s.id }}</td>
  <td>{{ s.date.strftime('%Y-%m-%d %H:%M') }}</td>
  <td>{{ s.customer.name if s.customer else '' }}</td>
  <td>R$ {{ '%.2f' % s.total }}</td>
  <td>
    <ul>
    {% for it in s.items %}
      <li>{{ it.product.name }} — {{ it.qty }} x R$ {{ '%.2f' % it.price }}</li>
    {% endfor %}
    </ul>
  </td>
</tr>
{% endfor %}
</table>
"""

@app.route('/report')
def report():
    sales = Sale.query.order_by(Sale.date.desc()).all()
    return render_template_string(REPORT, sales=sales)

##########
# Init
##########
def seed():
    if Product.query.count() == 0:
        p1 = Product(name="Camiseta", sku="CAM001", price=39.90, stock=10)
        p2 = Product(name="Caneca", sku="CAN001", price=19.90, stock=20)
        db.session.add_all([p1,p2])
        db.session.commit()
    if Customer.query.count() == 0:
        db.session.add_all([Customer(name="Ana Silva", email="ana@ex.com"),
                            Customer(name="Loja XP", email="contato@xp.com")])
        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed()
    app.run(debug=True, host="0.0.0.0")

