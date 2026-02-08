require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/blogs', require('./routes/blogRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
