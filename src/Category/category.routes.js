import { Router } from "express";
import { addCategory } from "../Category/category.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

router.post("/addCategory",validateJWT,addCategory);

export default router;