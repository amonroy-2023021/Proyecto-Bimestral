"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/users/user.routes.js";
import productRoutes from "../src/products/products.routes.js";
import categoryRoutes from "../src/Category/category.routes.js";
import ShopcartRoutes from "../src/shopcart/cart.routes.js";
import billRouter from "../src/bills/bills.routes.js";
import { initAdmin} from "../src/users/user.controller.js";
import { initDefaultCategory } from "../src/Category/category.controller.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"))
};

const routes = (app) => {
    app.use("/tiendaOnline/v1/auth", authRoutes),
    app.use("/tiendaOnline/v1/user", userRoutes),
    app.use("/tiendaOnline/v1/product", productRoutes),
    app.use("/tiendaOnline/v1/category", categoryRoutes),
    app.use("/tiendaOnline/v1/shopcart", ShopcartRoutes),
    app.use("/tiendaOnline/v1/bill", billRouter)
    app.use("/tiendaOnline/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }
const conectarDB = async () => {
    try {
        await dbConnection();
        await initAdmin();
        await initDefaultCategory();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};