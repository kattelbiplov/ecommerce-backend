const Order = require('../../Models/Order');
const Product = require('../../Models/Product');
const User = require('../../Models/User');
const PromoCode = require('../../Models/PromoCode');

const UserOrderController = {
    getOrders: async (req, res) => {
        try {
            const userId = req.user._id;
            const orders = await Order.find({ user: userId }).populate('products');
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    placeOrder: async (req, res) => {
        try {
            const { products,promoCode } = req.body;
            const userId = req.user._id;
            // Extract product IDs from the array of objects
            const productIds = products.map(item => item.productId);

            // Calculate total price
            let totalPrice = 0;
            let totalQuantity = 0;
            for (const item of products) {
                // Fetch product from the database
                const product = await Product.findById(item.productId);

                // Check if product exists
                if (!product) {
                    return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
                }

                // Calculate total price based on product price and quantity
                totalPrice += product.price * item.quantity;
                totalQuantity += item.quantity;
            }

             // Apply promo code discount if provided
             let discount = 0;
             if (promoCode) {
                 const promo = await PromoCode.findOne({ code: promoCode });
                 if (promo) {
                     if (promo.discountType === 'percentage') {
                         discount = (promo.value / 100) * totalPrice;
                     } else if (promo.discountType === 'fixed') {
                         discount = Math.min(promo.value, totalPrice);
                     }
                 }else{
                    return res.status(404).json({ error: 'Promo code not found' });
                 }
             }
 
             // Update total price after discount
             totalPrice -= discount;


            // Calculate points earned based on total price and quantity
            const pointsEarned = calculatePoints(totalPrice, totalQuantity);

            // Update user's reward points balance
            await User.findByIdAndUpdate(userId, { $inc: { rewardPoint: pointsEarned } });

            // Create order with productIds
            const newOrder = new Order({ user: userId, products: productIds, totalPrice, quantity: totalQuantity, pointsEarned });
            await newOrder.save();
            // Update user's points balance
            res.status(201).json({ message: 'Order placed successfully', order: newOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
// Calculate points based on total price and total quantity
function calculatePoints(totalPrice, totalQuantity) {

    if (totalPrice > 800 && totalQuantity > 5) {
        const pointsPerAmount = Math.floor(totalPrice / 400) * 1     // 1 points for every Npr. 400 spent
        const pointsPerQuantity = Math.floor(totalQuantity / 5) * 2; // 2 points for every 5 items ordered
        return pointsPerAmount + pointsPerQuantity;
    } else {
        const pointsPerQuantity = 1.5;
        return pointsPerQuantity;
    }
}

module.exports = UserOrderController;
