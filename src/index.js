import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

import balanceSheetRoutes from './routes/balanceSheetRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api', balanceSheetRoutes);

app.use(errorHandler);


mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
