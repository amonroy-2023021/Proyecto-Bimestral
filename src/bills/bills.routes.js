import { Router } from "express";
import { completePurchase, generateBillPDF, HistoryShop } from "../bills/bills.controller.js"

const router = Router();

router.post("/complete", completePurchase);
router.get("/generateBillPDF/:billId", generateBillPDF);
router.get("/history/:uid", HistoryShop);
export default router;