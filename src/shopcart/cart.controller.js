import cart from "../shopcart/cart.model.js";
import product from "../products/products.model.js";
import user from "../users/user.model.js";

export const addProductToCart = async (req, res) => {
    try {
        const { username, productName, quantityProducts } = req.body;

        const userFound = await user.findOne({ username });
        if (!userFound) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        const productFound = await product.findOne({ name: productName });
        if (!productFound) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }

        let userCart = await cart.findOne({ user: userFound._id });
        if (!userCart) {
            userCart = new cart({
                user: userFound._id,
                items: [],
                totalPrice: 0
            });
        }

        const cartItem = userCart.items.find(item => item.product.toString() === productFound._id.toString());
        if (cartItem) {
            cartItem.quantityProducts += quantityProducts;
        } else {
            userCart.items.push({
                product: productFound._id,
                quantityProducts
            });
        }
        userCart.totalPrice += productFound.price * quantityProducts;

        await userCart.save();
        const populatedCart = await cart.findById(userCart._id)
            .populate('user', 'username')
            .populate('items.product', 'name');
        res.status(201).json({
            success: true,
            msg: 'Producto agregado al carrito',
            cart: populatedCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al agregar producto al carrito',
            error: err.message
        });
    }
};
export const viewCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const userCart = await cart.findOne({ user: userId })
            .populate('user', 'username')
            .populate('items.product', 'name price');

        if (!userCart) {
            return res.status(404).json({
                success: false,
                msg: 'Carrito no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            cart: userCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener el carrito',
            error: err.message
        });
    }
};

export const deleteProductCart = async (req, res) => {
    try {
        const { username, productName, quantityProducts } = req.body;

        const userFound = await user.findOne({ username });
        if (!userFound) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        const productFound = await product.findOne({ name: productName });
        if (!productFound) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }

        let userCart = await cart.findOne({ user: userFound._id });
        if (!userCart) {
            return res.status(404).json({
                success: false,
                msg: 'Carrito no encontrado'
            });
        }

        const cartItem = userCart.items.find(item => item.product.toString() === productFound._id.toString());
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado en el carrito'
            });
        }

        if (cartItem.quantityProducts <= quantityProducts) {
            userCart.items = userCart.items.filter(item => item.product.toString() !== productFound._id.toString());
        } else {
            cartItem.quantityProducts -= quantityProducts;
        }

        userCart.totalPrice -= productFound.price * quantityProducts;
        if (userCart.totalPrice < 0) userCart.totalPrice = 0;

        await userCart.save();
        const populatedCart = await cart.findById(userCart._id)
            .populate('user', 'username')
            .populate('items.product', 'name');
        res.status(200).json({
            success: true,
            msg: 'Producto eliminado del carrito',
            cart: populatedCart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar producto del carrito',
            error: err.message
        });
    }
};