import Product from "../products/products.model.js";
import Category from "../Category/category.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        const newProduct = new Product({ name, description, price, stock, category });
        await newProduct.save();
        const populatedProduct = await Product.findById(newProduct._id).populate('category', 'name');
        res.status(201).json({
            success: true,
            msg: "Producto creado",
            product: populatedProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al crear producto",
            error: err.message
        });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ }).populate("category", "name");
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener productos',
            error: err.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener producto',
            error: err.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Producto actualizado',
            product: updatedProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar producto',
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Producto eliminado',
            product: deletedProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar producto',
            error: err.message
        });
    }
};


export const SoldOut = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener productos agotados',
            error: err.message
        });
    }
};


export const sellingProducts = async (req, res) => {
    try {
        const products = await Product.find({ sold: { $gt: 0 } }).sort({ sold: -1 });
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener productos",
            error: err.message
        });
    }
};

export const listProductsBy = async (req, res) => {
    try {
        const { FiltrarPor } = req.query;

        let products;

        if (!FiltrarPor) {
            return res.status(400).json({
                success: false,
                msg: "Debe proporcionar un valor en FiltrarPor"
            });
        }

        if (FiltrarPor === 'MasVendidos') {
            products = await Product.find({}).sort({ sold: -1 }).limit(10).populate("category", "name");
        } else {
            const productByName = await Product.find({ name: { $regex: FiltrarPor, $options: "i" } }).populate("category", "name");

            if (productByName.length > 0) {
                products = productByName;
            } else {
                const category = await Category.findOne({ name: FiltrarPor });

                if (category) {
                    products = await Product.find({ category: category._id }).populate("category", "name");
                } else {
                    return res.status(404).json({
                        success: false,
                        msg: "No se encontraron productos con ese criterio"
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al listar productos",
            error: err.message
        });
    }
};
