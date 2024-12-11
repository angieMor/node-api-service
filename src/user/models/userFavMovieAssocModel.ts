const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
import User from './userModel';
import FavoriteMovie from './favoriteMovieModel';

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
      model: User,
      key: 'id',
    },
  },
  fav_movies_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FavoriteMovie,
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

export default UserFavMovieAssoc;