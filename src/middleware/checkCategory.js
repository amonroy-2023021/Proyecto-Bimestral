import Category from "../Category/category.model.js";

export const checkCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            let category = await Category.findOne({ name: "Sin Categoría" });
            if (!category) {
                category = new Category({ name: "Sin Categoría" });
                await category.save();
            }
            req.body.category = category._id;
        } else {
            const category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(404).json({
                    success: false,
                    msg: "Categoría no encontrada"
                });
            }
            req.body.category = category._id;
        }

        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al verificar la categoría",
            error: err.message
        });
    }
};