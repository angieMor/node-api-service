"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const userModel_1 = __importDefault(require("./userModel"));
const favoriteMovieModel_1 = __importDefault(require("./favoriteMovieModel"));
const UserFavMovieAssoc = sequelize.define('UserFavMovieAssoc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
    },
    fav_movies_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: favoriteMovieModel_1.default,
            key: 'id',
        },
    },
    Notes: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
    },
}, {
    tableName: 'users_fav_movies_assoc',
    timestamps: false,
});
exports.default = UserFavMovieAssoc;
