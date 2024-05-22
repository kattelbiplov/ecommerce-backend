const Category = require('../../Models/Category');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = categoryController;
