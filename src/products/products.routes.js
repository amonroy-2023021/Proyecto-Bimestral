import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, SoldOut, sellingProducts} from "../products/products.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

router.post("/addProduct",validateJWT,createProduct);
router.get("/",validateJWT, getProducts);
router.get("/soldOut",validateJWT, SoldOut);
router.get("/sellingProducts",validateJWT, sellingProducts);
router.get("/:id",validateJWT, getProductById);
router.put("/update/:id",validateJWT, updateProduct);
router.delete("/delete/:id",validateJWT, deleteProduct);


export default router;