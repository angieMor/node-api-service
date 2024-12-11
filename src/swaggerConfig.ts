import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
        ],
        tags: [
            {
                name: 'User Management',
                description: 'Endpoints related to user operations',
            },
            {
                name: 'Authentication',
                description: 'Endpoints related to authentication and authorization',
            },
            {
                name: 'Sentiment',
                description: 'Endpoints related to sentiment analysis',
            },
        ],
    },
    apis: [
        './dist/user/routes/userRoutes.js',
        './dist/authentication/routes/authRoutes.js',
        './dist/user/routes/sentimentRoutes.js'
    ],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
