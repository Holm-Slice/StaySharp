
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Connect to MongoDB (you'll need to set up MongoDB in Replit)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/staysharp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  items: [{ 
    productId: String, 
    name: String, 
    price: Number, 
    quantity: Number 
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// Auth middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Authentication Routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
  res.json({ valid: true });
});

// Admin Product Routes
app.get('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Order Routes
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/orders/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Analytics Routes
app.get('/api/admin/analytics', authenticateAdmin, async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const lowStockItems = await Product.countDocuments({ stock: { $lte: 5 } });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('id customerEmail total createdAt');

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
        _id: '$items.productId',
        name: { $first: '$items.name' },
        sales: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
      }},
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalProducts,
      lowStockItems,
      recentOrders,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create default admin user
async function createDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new Admin({
        username: 'admin',
        password: hashedPassword
      });
      await admin.save();
      console.log('Default admin created: username=admin, password=admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  createDefaultAdmin();
});
