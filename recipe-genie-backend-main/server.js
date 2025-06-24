const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoutes = require('./routers/userRoutes');
const recipeRoutes = require('./routers/recipeRoutes');

dotenv.config(); // Load env vars

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON body

app.use('/uploads', express.static('uploads'));

// DB Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});