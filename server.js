const express = require('express');
const connectDB = require('./src/Config/dbConfig');
const authRoutes = require('./src/Routes/UserRoutes/authRoutes');
const profileRoutes = require('./src/Routes/UserRoutes/profileRoutes')
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());



app.use('/api/user/auth', authRoutes);
app.use('/api/user',profileRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
