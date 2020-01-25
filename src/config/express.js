const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const courseRoutes = require('../routes/courseRoutes');
const authRoutes = require('../routes/authRoutes');

module.exports = function() {
  app.use(express.json());
  app.use(cors());

  app.use(courseRoutes);
  app.use('/auth', authRoutes);

  const PORT = process.env.PORT || 3000;
  app.set('PORT', PORT);

  return app;
}
