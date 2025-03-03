import User from "../users/user.model.js";

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const currentUser = await User.findById(req.user.id);

        if (data.role && currentUser.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                success: false,
                msg: "No tienes permisos para cambiar el rol"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Usuario Actualizado",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar usuario",
            error: err.message
        });
    }
};

export const getUsers = async(req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { state: true };
        
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener los usuarios",
            error
        })
    }
}
