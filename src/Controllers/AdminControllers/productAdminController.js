const Product = require('../../Models/Product');
const Vendor = require('../../Models/Vendor')
const productController = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description, category, vendor, imageData, contentType } = req.body;
            let image = {}; 
            if (imageData && contentType) {
                const imageBuffer = Buffer.from(imageData, 'base64');
                image = { data: imageBuffer, contentType };
            }
            const newProduct = new Product({ name, price, description, category, vendor, image });
            await newProduct.save();
            res.status(201).json({ message: 'Product added successfully', product: newProduct });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

  
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { name, price, description, category, vendor } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, description, category, vendor }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = productController;
