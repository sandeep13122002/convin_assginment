
import { Router } from 'express';

import { downloadBalanceSheet } from '../controllers/downloadBalanceSheet.js';
const router = Router();

router.get('/download-balance-sheet', downloadBalanceSheet);

export default router;