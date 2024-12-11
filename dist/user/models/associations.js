"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFavMovieAssoc = exports.FavoriteMovie = exports.User = exports.sequelize = void 0;
const sequelize = require('../config/db');
exports.sequelize = sequelize;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const favoriteMovieModel_1 = __importDefault(require("./favoriteMovieModel"));
exports.FavoriteMovie = favoriteMovieModel_1.default;
const userFavMovieAssocModel_1 = __importDefault(require("./userFavMovieAssocModel"));
exports.UserFavMovieAssoc = userFavMovieAssocModel_1.default;
userModel_1.default.hasMany(userFavMovieAssocModel_1.default, { foreignKey: 'user_id', as: 'userMovies' });
userFavMovieAssocModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'user_id', as: 'user' });
favoriteMovieModel_1.default.hasMany(userFavMovieAssocModel_1.default, { foreignKey: 'fav_movies_id', as: 'movieAssociations' });
userFavMovieAssocModel_1.default.belongsTo(favoriteMovieModel_1.default, { foreignKey: 'fav_movies_id', as: 'favoriteMovie' });
