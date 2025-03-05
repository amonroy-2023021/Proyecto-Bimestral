import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, SoldOut, sellingProducts, listProductsBy} from "../products/products.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import { checkCategory } from "../middleware/checkCategory.js";

const router = Router();

/**
 * @swagger
 * /products/addProduct:
 *   post:
 *     summary: Añade un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto A"
 *               price:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Error al crear el producto
 *       500:
 *         description: Error del servidor
 */
router.post("/addProduct", validateJWT, checkCategory, createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get("/", validateJWT, getProducts);

/**
 * @swagger
 * /products/getProductsBy:
 *   get:
 *     summary: Obtiene productos por criterio
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get("/getProductsBy", listProductsBy);

/**
 * @swagger
 * /products/soldOut:
 *   get:
 *     summary: Obtiene productos agotados
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos agotados obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get("/soldOut", validateJWT, SoldOut);

/**
 * @swagger
 * /products/sellingProducts:
 *   get:
 *     summary: Obtiene productos más vendidos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos obtenida con éxito
 *       500:
 *         description: Error del servidor
 */
router.get("/sellingProducts", validateJWT, sellingProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", validateJWT, getProductById);

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto A"
 *               price:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/update/:id", validateJWT, updateProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/delete/:id", validateJWT, deleteProduct);

export default router;