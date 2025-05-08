require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const consumer = require('./kafka/kafkaConsumer');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',  // allow React frontend
    credentials: true
  }));

app.use('/api/auth', authRoutes);
mongoose.connect('mongodb://127.0.0.1:27017/kafka-register',{}
    // , { useNewUrlParser: true, useUnifiedTopology: true }

)
  .then(() => console.log('Mongo Connected'))
  .catch((err) => console.error(err));
// Start Kafka Consumer
consumer();

app.listen(5000, () => console.log('Server running on port 5000'));
