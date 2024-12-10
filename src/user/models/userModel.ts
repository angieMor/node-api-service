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
        type:  DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favorite_movies: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: true,
    },
}, {
    tableName: 'users',
    // createdAt and updatedAt columns
    timestamps: false,
})

export default User;