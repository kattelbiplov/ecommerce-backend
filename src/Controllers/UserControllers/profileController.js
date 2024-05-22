const User = require('../../Models/User');
const bcrypt = require('bcryptjs');

// Controller function to retrieve user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Extract user ID from authenticated user
        const userId = req.user.id;

        // Find user in database by ID
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        // Extract user ID from authenticated user
        const userId = req.user.id;

        // Update user profile in database
        await User.findByIdAndUpdate(userId, req.body);

        res.json({ success: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to change user password
exports.changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Extract user ID from authenticated user
        const userId = req.user.id;

        // Find user in database by ID
        const user = await User.findById(userId);

        // Check if current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid current password' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update user password in database
        await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.json({ success: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
