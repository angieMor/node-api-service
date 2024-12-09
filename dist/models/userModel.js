"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favorite_movies: {
        type: DataTypes.JSON,
        default: {},
        allowNull: false,
    },
}, {
    tableName: 'users',
    // createdAt and updatedAt columns
    timestamps: false,
});
exports.default = User;
