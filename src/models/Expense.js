import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    split_type: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
    splits: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        
        amount: Number,
        percentage: Number,
    }],
});

const Expense= mongoose.model('Expense', expenseSchema);
export default Expense;