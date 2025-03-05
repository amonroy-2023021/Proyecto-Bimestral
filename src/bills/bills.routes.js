import { Router } from "express";
import { completePurchase, generateBillPDF, HistoryShop } from "../bills/bills.controller.js"

const router = Router();

/**
 * @swagger
 * /bills/complete:
 *   post:
 *     summary: Completa una compra
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: Compra completada con éxito
 *       400:
 *         description: El carrito está vacío
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al completar la compra
 */
router.post("/complete", completePurchase);

/**
 * @swagger
 * /bills/generateBillPDF/{billId}:
 *   get:
 *     summary: Genera un PDF de la factura
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: billId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura generada con éxito
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error al generar la factura
 */
router.get("/generateBillPDF/:billId", generateBillPDF);

/**
 * @swagger
 * /bills/history/{uid}:
 *   get:
 *     summary: Obtiene el historial de compras de un usuario
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Historial de compras obtenido con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el historial de compras
 */
router.get("/history/:uid", HistoryShop);

export default router;