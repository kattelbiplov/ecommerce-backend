const User = require('../../Models/User');
const bcrypt = require('bcryptjs');

// Controller function to retrieve user profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

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
        const userId = req.user.id;

        await User.findByIdAndUpdate(userId, req.body);

        res.json({ success: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId);

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid current password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.json({ success: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
