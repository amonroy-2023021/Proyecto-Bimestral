import { hash, verify } from "argon2"
import User from "../users/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    console.log("Login request received with:", { email, username, password });

    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found");
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const validPassword = await verify(user.password, password);
        console.log("Password validation result:", validPassword);

        if (!validPassword) {
            console.log("Invalid password");
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user.id);
        console.log("Generated token:", token);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        });
    } catch (err) {
        console.log("Error during login:", err);
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};