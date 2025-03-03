import { body, param } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({ min: 4 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
];

export const updateProfileValidator = [
    body("name").optional().isString().withMessage("El nombre debe ser una cadena"),
    body("surname").optional().isString().withMessage("El apellido debe ser una cadena"),
    body("username").optional().isString().withMessage("El username debe ser una cadena"),
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("phone").optional().isString().withMessage("El teléfono debe ser una cadena"),
    body("role").optional().isIn(["ADMIN_ROLE", "USER_ROLE"]).withMessage("Rol no válido"),
    validarCampos,
];

