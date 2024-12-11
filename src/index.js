import {config} from 'dotenv';
import cors from 'cors';
import express from 'express';
import sequelize from './user/config/db';
import './user/models/associations';
import userRoutes from './user/routes/userRoutes';
import authRoutes  from './authentication/routes/authRoutes';
import sentimentRoutes from './user/routes/sentimentRoutes';
import swaggerUi from 'swagger-ui-express';
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
app.use('/sentiment-analysis', sentimentRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});