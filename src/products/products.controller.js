import Product from "../products/products.model.js";
import Category from "../Category/category.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryName } = req.body;
        console.log(categoryName);

        let category;
        if (categoryName) {
            category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(404).json({
                    success: false,
                    msg: "Categoría no encontrada"
                });
            }
        } else {
            category = await Category.findOne({ name: "Sin Categoría" });
            if (!category) {
                category = new Category({ name: "Sin Categoría" });
                await category.save();
            }
        }

        const newProduct = new Product({ name, description, price, stock, category: category._id });
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
        const products = await Product.find({ sold: { $gt: 0}});
        res.status(200).json({
            success: true,
            products
        });
    }catch (err){
        res.status(500).json({
            success: false,
            msg: "error al obtener productos",
            error: err.message
        });
    }
}