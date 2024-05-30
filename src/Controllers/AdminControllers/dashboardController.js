const Order = require('../../Models/Order');
const moment = require('moment')
const DashboardController = {
    getDashboardData: async (req, res) => {
        try {
            // Get start and end dates for the time frame (defaults to current month)
            const startDate = req.query.startDate ? moment(req.query.startDate) : moment().startOf('month');
            const endDate = req.query.endDate ? moment(req.query.endDate) : moment().endOf('month');
               const category = req.query.category; 

            // Aggregate sales data
            const orders = await Order.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('products');
            let categorySales = 0;

            for (const order of orders) {
                for (const product of order.products) {
                    if (product.category === category) {
                        categorySales += product.price * product.quantity;
                    }
                }
            }

           
            let salesPerDay = {}; 
            let salesPerMonth = {}; 
            let vendorSales = {}; 
            let totalQuantity = 0; 
            for (const order of orders) {
                // Sales per day
                const orderDay = moment(order.createdAt).format('YYYY-MM-DD');
                salesPerDay[orderDay] = (salesPerDay[orderDay] || 0) + order.totalPrice;

                // Sales per month
                const orderMonth = moment(order.createdAt).format('YYYY-MM');
                salesPerMonth[orderMonth] = (salesPerMonth[orderMonth] || 0) + order.totalPrice;

                // Category-wise sales and total quantity
                for (const product of order.products) {
                    const category = product.category;
                    categorySales[category] = (categorySales[category] || 0) + (product.price * product.quantity);
                    totalQuantity += product.quantity;
                }

                 // Vendor-wise sales
                 const vendorName = order.vendor ? order.vendor.name : 'Unknown Vendor';
                vendorSales[vendorName] = (vendorSales[vendorName] || 0) + order.totalPrice;
            }

            res.json({ salesPerDay, salesPerMonth, categorySales, vendorSales, totalQuantity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};


module.exports = DashboardController