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

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id)

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Categoría no encontrada"
            });
        }
        let defaultCategory = await Category.findOne({ name: "Sin Categoría" });
        if (!defaultCategory) {
            defaultCategory = new Category({ name: "Sin Categoría" });
            await defaultCategory.save();
        }
        await Product.updateMany({ category: id }, { category: defaultCategory._id });
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Categoría eliminada y productos reasignados a 'Sin Categoría'"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar categoría",
            error: err.message
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Categoría no encontrada"
            });
        }

        category.name = name;
        await category.save();

        res.status(200).json({
            success: true,
            msg: "Categoría actualizada",
            category
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar categoría",
            error: err.message
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener categorías",
            error: err.message
        });
    }
};