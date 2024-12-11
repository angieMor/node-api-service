"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const FavoriteMovie = sequelize.define('FavoriteMovies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Poster: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Plot: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'favorite_movies',
    timestamps: false,
});
exports.default = FavoriteMovie;
