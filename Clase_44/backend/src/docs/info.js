export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marce Store API',
            version: '1.0.0',
            description: 'API para la gestión de productos y usuarios de MarceStore',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
            // {
            //     url: 'https://marcestore.herokuapp.com',
            //     description: 'Production'
            // }
        ],
    },
    apis: ["./src/docs/*.yml"],
};
