const sequelize = require('../config/db');
import User from './userModel';
import FavoriteMovie from './favoriteMovieModel';
import UserFavMovieAssoc from './userFavMovieAssocModel';

User.hasMany(UserFavMovieAssoc, { foreignKey: 'user_id', as: 'userMovies' });
UserFavMovieAssoc.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

FavoriteMovie.hasMany(UserFavMovieAssoc, { foreignKey: 'fav_movies_id', as: 'movieAssociations' });
UserFavMovieAssoc.belongsTo(FavoriteMovie, { foreignKey: 'fav_movies_id', as: 'favoriteMovie' });

export {
  sequelize,
  User,
  FavoriteMovie,
  UserFavMovieAssoc,
};