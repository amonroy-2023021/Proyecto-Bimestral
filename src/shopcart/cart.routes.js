import {Router} from 'express';
import { addProductToCart, viewCart, deleteProductCart } from '../shopcart/cart.controller.js';
import { validateJWT } from '../middleware/validate-jwt.js';

const router = Router();

router.post('/addcart',validateJWT, addProductToCart);
router.get('/cart',validateJWT, viewCart);
router.delete('/deleteCart',validateJWT, deleteProductCart);
export default router;
