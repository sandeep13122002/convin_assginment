import { createObjectCsvWriter } from 'csv-writer';
import Expense from '../models/Expense.js';
import User from '../models/User.js';

export const downloadBalanceSheet = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('user_id').populate('splits.user_id');

        const balanceSheet = {};

    
        expenses.forEach(expense => {
            const totalExpense = expense.amount;
            expense.splits.forEach(split => {
                const userId = split.user_id._id.toString();

                
                if (!balanceSheet[userId]) {
                    balanceSheet[userId] = {
                        name: split.user_id.name, // Assume User model has a name field
                        totalPaid: 0,
                        totalOwed: 0,
                    };
                }

                
                if (expense.split_type === 'equal') {
                    const equalShare = totalExpense / expense.splits.length;
                    
                        balanceSheet[userId].totalOwed += equalShare;
                    
                    
                } else if (expense.split_type === 'exact') {
                    
                        balanceSheet[userId].totalOwed += split.owedAmount || 0;
                    
                    
                } else if (expense.split_type === 'percentage') {
                    
                        balanceSheet[userId].totalOwed += (totalExpense * (split.percentage / 100));
                    
                    
                }

                
                if (expense.user_id._id.toString() === userId) {
                    balanceSheet[userId].totalPaid += totalExpense;
                }
            });
        });

        // 
        const records = Object.entries(balanceSheet).map(([userId, data]) => ({
            userId,
            name: data.name,
            totalPaid: data.totalPaid,
            totalOwed: data.totalOwed,
            balance: data.totalPaid - data.totalOwed,
        }));

        
        const csvWriter = createObjectCsvWriter({
            path: 'balance_sheet.csv',
            header: [
                { id: 'userId', title: 'User ID' },
                { id: 'name', title: 'Name' },
                { id: 'totalPaid', title: 'Total Paid' },
                { id: 'totalOwed', title: 'Total Owed' },
                { id: 'balance', title: 'Balance' },
            ],
        });

        
        await csvWriter.writeRecords(records);

        
        res.download('balance_sheet.csv', 'balance_sheet.csv', (err) => {
            if (err) {
                res.status(500).send({ message: 'Error downloading the file.' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
