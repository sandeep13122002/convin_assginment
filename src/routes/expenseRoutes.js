import express from 'express';

import { addExpense,getAllExpenses,getUserExpenses } from '../controllers/expenseController.js';
const router = express.Router();

router.post('/', addExpense);
router.get('/user/:id', getUserExpenses);
router.get('/', getAllExpenses);

export default router;
