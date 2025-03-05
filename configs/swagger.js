import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Gestor de Tienda API",
            version: "1.0.0",
            description: "API para una tienda Online",
            contact: {
                name: "Alexis Monroy",
                email: "amonroy-2023021@kinal.org.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3000/tiendaOnline/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/Category/category.routes.js",
        "./src/bills/bills.routes.js",
        "./src/shopcart/cart.routes.js",
        "./src/products/products.routes.js",
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };