const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
