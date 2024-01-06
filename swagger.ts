import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Shopping Cart API",
        version: "1.0.0",
        description: "API for shopping cart",
    },
    host: "localhost:3000",
    basePath: "/",
};

const options = {
    swaggerDefinition,
    apis: ["./src/resources/user/user.controller.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;