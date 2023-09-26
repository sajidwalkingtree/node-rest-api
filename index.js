require('dotenv').config();
const express = require('express');
const app = express();  
const cors = require('cors');
const sequelize = require('./config/db'); 
const passport = require('./middleware/passport-config');
const authRoutes = require('./routes/authRoutes');
const projectRoute = require('./routes/projectRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');

const port = process.env.PORT || 11000;

sequelize.sync() // Synchronize models with the database
  .then(() => {
    console.log('Database synchronization complete.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  }); 

app.use(cors())
app.use(express.json());
app.use(passport.initialize());
app.use('/', authRoutes);
app.use(authenticateJWT);

// Protected route that requires authentication
app.use('/project', projectRoute);


app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// Add this at the end of your code
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
