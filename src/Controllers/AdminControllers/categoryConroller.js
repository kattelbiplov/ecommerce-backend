const Category = require('../../Models/Category')

const categoryController = {
    createCategory: async (req, res) => {
        try {
            if (!req.role=='admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const { name } = req.body;
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ error: 'Category with this name already exists' });
            }
            const newCategory = new Category({ name });
            await newCategory.save();
            res.status(201).json({ message: 'Category added successfully', category: newCategory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    
    updateCategory: async (req, res) => {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const categoryId = req.params.id;
            const { name } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const categoryId = req.params.id;
            const deletedCategory = await Category.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = categoryController;
