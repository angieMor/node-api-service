"use strict";
const { Sequelize } = require('sequelize');
// Configuración de la conexión
const sequelize = new Sequelize('main_database', 'postgres', '54321', {
    host: 'localhost', // Dirección del servidor de PostgreSQL
    dialect: 'postgres',
    logging: false,
});
module.exports = sequelize;
