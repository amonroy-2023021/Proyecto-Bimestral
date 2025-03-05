import Product from "../products/products.model.js";

export const checkStock = async (req, res, next) => {
    try {
        const { productName, quantityProducts } = req.body;

        const productFound = await Product.findOne({ name: productName });
        if (!productFound) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }

        if (productFound.stock < quantityProducts) {
            return res.status(400).json({
                success: false,
                msg: 'Producto sin stock suficiente'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al verificar el stock del producto',
            error: err.message
        });
    }
};