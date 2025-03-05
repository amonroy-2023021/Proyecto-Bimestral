import { Router } from "express";
import { addCategory, deleteCategory, updateCategory, getCategories } from "../Category/category.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
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
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category added successfully
 *       500:
 *         description: Error adding category
 */
router.post("/addCategory", validateJWT, addCategory);

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:id", validateJWT, deleteCategory);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 */
router.put("/update/:id", validateJWT, updateCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error getting categories
 */
router.get("/", validateJWT, getCategories);

export default router;