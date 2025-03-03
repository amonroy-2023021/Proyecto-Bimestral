import { Router } from "express";
import { updateUser, getUsers } from "./user.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import { updateProfileValidator } from "../middleware/user-validator.js";

const router = Router();

router.put("/:uid",validateJWT, updateProfileValidator, updateUser);

router.get("/", getUsers)

export default router