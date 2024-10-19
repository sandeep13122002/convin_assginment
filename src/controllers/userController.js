import User from "../models/User.js";

// Create User
export const createUser = async (req, res) => {
    try {
        const { email, name, mobile_number } = req.body;
        if (!email || !name || !mobile_number) {
            return res.status(400).json({ message: 'Email, name, and mobile number are required.' });
        }
    
        const user = new User({ email, name, mobile_number });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve User Details
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
