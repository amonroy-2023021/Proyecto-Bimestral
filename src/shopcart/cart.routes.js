import {Router} from 'express';
import { addProductToCart, viewCart, deleteProductCart } from '../shopcart/cart.controller.js';
import { validateJWT } from '../middleware/validate-jwt.js';
import { checkStock } from '../middleware/checkStock.js';

const router = Router();

/**
 * @swagger
 * /cart/addcart:
 *   post:
 *     summary: Añade un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Producto añadido al carrito con éxito
 *       400:
 *         description: Error al añadir el producto al carrito
 *       500:
 *         description: Error del servidor
 */
router.post('/addcart',validateJWT, checkStock, addProductToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Ver el carrito de compras
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido con éxito
 *       500:
 *         description: Error del servidor
 */
router.get('/cart',validateJWT, viewCart);

/**
 * @swagger
 * /cart/deleteCart:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito
 *       400:
 *         description: Error al eliminar el producto del carrito
 *       500:
 *         description: Error del servidor
 */
router.delete('/deleteCart',validateJWT, deleteProductCart);

export default router;
