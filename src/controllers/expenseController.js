
import Expense from '../models/Expense.js';
import User from '../models/User.js';
// Add Expense
export const addExpense = async (req, res) => {
    try {
        const { amount, description, user_id, split_type,splits } = req.body;
        if (!amount || !description || !user_id) {
            return res.status(400).json({ message: 'Amount, description, and user_id are required.' });
        }

        if (split_type === 'percentage') {
            const totalPercentage = splits.reduce((total, split) => {
                return total + (split.percentage || 0);
            }, 0);

            if (totalPercentage !== 100) {
                return res.status(400).json({ message: 'Percentages must sum up to 100%' });
            }
        }




        const expense = new Expense({ amount, description, user_id,split_type, splits });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user_id: req.params.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve Overall Expenses
export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
