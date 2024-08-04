import { Router } from "express";

import { getDashboardMetrics } from "../controllers/dashboardController";

const router: Router = Router();

router.get("/", getDashboardMetrics);

export default router;
