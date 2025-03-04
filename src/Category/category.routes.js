import { Router } from "express";
import { addCategory, deleteCategory, updateCategory, getCategories} from "../Category/category.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

router.post("/addCategory",validateJWT,addCategory);
router.delete("/deleteCategory/:id", validateJWT, deleteCategory);
router.put("/update/:id", validateJWT, updateCategory );
router.get("/", validateJWT, getCategories)
export default router;