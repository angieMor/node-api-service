"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const swaggerSpecs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerSpecs;
