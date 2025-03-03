import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No existe token en la petición"
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: "Usuario desactivado previamente"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        });
    }
};