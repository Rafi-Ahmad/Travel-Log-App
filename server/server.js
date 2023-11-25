const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./services/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();



// Routes
const travelRoutes = require('./routes/travelRoutes');
app.use('/api/travels', travelRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});