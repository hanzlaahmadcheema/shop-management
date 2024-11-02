const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
