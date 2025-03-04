import Category from './category.model.js';
import Product from '../products/products.model.js';

export const addCategory = async (req, res) => {
    try {
        const { name} = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({
            success: true,
            msg: 'Categoría agregada',
            category: newCategory
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al agregar categoría',
            error: err.message
        });
    }
};