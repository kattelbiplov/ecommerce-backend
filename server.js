const express = require('express');
const connectDB = require('./src/Config/dbConfig');
const authRoutes = require('./src/Routes/UserRoutes/authRoutes');
const profileRoutes = require('./src/Routes/UserRoutes/profileRoutes')
const categoryRoutes = require('./src/Routes/AdminRoutes/categoryRoutes');
const ProductRoutes = require('./src/Routes/AdminRoutes/productRoutes');
const vendorRoutes = require('./src/Routes/AdminRoutes/vendorRoutes')
const orderUserRoutes = require('./src/Routes/UserRoutes/orderUserRoutes');
const orderAdminRoutes = require('./src/Routes/AdminRoutes/orderAdminRoutes');
const promoCodeRoutes = require('./src/Routes/AdminRoutes/promoCodeRoutes');
const dashboardRoutes = require('./src/Routes/AdminRoutes/dashboardRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());



app.use('/api/user/auth', authRoutes);
app.use('/api/user/profile',profileRoutes );
app.use('/api/admin/categories',categoryRoutes)
app.use('/api/admin/products', ProductRoutes)
app.use('/api/admin/vendor', vendorRoutes)
app.use('/api/user/orders', orderUserRoutes)
app.use('/api/admin/orders', orderAdminRoutes)
app.use('/api/admin/promoCode',promoCodeRoutes)
app.use('/api/admin',dashboardRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
