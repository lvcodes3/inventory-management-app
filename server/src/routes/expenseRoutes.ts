import { Router } from "express";

import { getExpensesByCategory } from "../controllers/expenseController";

const router: Router = Router();

router.get("/", getExpensesByCategory);

export default router;
