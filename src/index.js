import {config} from 'dotenv';
import cors from 'cors';

const express = require('express');
const sequelize = require('./user/config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./authentication/routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
import swaggerSpecs from './swaggerConfig';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error conectando a la base de datos:', error);
});