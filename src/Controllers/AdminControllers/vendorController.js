const Vendor = require('../../Models/Vendor')

const vendorController = {
    // Create vendor
    createVendor: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const { name, location } = req.body;
            const existingVendor = await Vendor.findOne({ name });
            if (existingVendor) {
                return res.status(400).json({ error: 'Vendor already exists' });
            }
            const newVendor = new Vendor({ name, location });
            await newVendor.save();
            res.status(201).json({ message: 'Vendor added successfully', vendor: newVendor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    getAllVendor: async (req, res) => {
        try {
            const vendor = await Vendor.find();
            res.json(vendor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    updateVendor: async (req, res) => {
        try {
            if (req.user.role!=='admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const vendorId = req.params.id;
            const { name, location } = req.body;
            const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, { name, location }, { new: true });
            if (!updatedVendor) {
                return res.status(404).json({ error: 'vendor not found' });
            }
            res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    deleteVendor: async (req, res) => {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const vendorId = req.params.id;
            const deletedVendor = await Vendor.findByIdAndDelete(vendorId);
            if (!deletedVendor) {
                return res.status(404).json({ error: 'Vendor not found' });
            }
            res.json({ message: 'Vendor deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = vendorController;
