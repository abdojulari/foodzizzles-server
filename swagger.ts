import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Foodzizzles API",
        version: "1.0.0",
        description: "API for foodzizzles application",
        license: {
            name: "MIT",
            url: "https://choosealicense.com/licenses/mit/",
        },
        contact:{
            email: "abdulkabirojulari@gmail.com",
        }

    },
    host: "localhost:3000",
    basePath: "/",
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
    },
        security: [{
            bearerAuth: []
    }]
    
};





const options = {
    swaggerDefinition,
    apis: [
            "./src/resources/user/user.controller.ts",
            "./src/resources/login/login.controller.ts",
            "./src/resources/recipes/recipe.controller.ts"
        ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;