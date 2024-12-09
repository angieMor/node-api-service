const { Sequelize } = require('sequelize');
import {config} from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true,
        native:true
    }
});

module.exports = sequelize;
