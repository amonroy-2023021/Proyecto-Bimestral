import { Router } from "express";
import { completePurchase, generateBillPDF } from "../bills/bills.controller.js"

const router = Router();

router.post("/complete", completePurchase);
router.get("/generateBillPDF/:billId", generateBillPDF);
export default router;