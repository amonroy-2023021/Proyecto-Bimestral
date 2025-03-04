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

export const getUsers = async (req = request, res = response) => {
    try {
        console.log("Obteniendo todos los usuarios...");

        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Usuario Administrador, acceso concedido: Usuarios obtenidos",
            users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al obtener los usuarios",
            error
        });
    }
};

export const deleteUser = async (req = request, res = response) => {
    try {
        const { uid } = req.params;
        console.log(uid);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                msg: "No estás autenticado"
            });
        }

        if (req.user.id !== uid) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permisos para eliminar esta cuenta"
            });
        }

        const deletedUser = await User.findByIdAndDelete(uid);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Usuario eliminado",
            user: deletedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar usuario",
            error: err.message
        });
    }
};

