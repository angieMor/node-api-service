"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
(0, dotenv_1.config)();
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig_1.default));
app.use(express.json());
app.use('/user', userRoutes);
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error conectando a la base de datos:', error);
});
