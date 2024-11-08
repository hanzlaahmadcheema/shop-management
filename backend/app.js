const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/incomingStock', require('./routes/incomingStockRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/categories', require('./routes/categoryRoutes'));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
