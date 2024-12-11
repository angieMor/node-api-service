"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const favoriteMovieModel_1 = __importDefault(require("../models/favoriteMovieModel"));
const userFavMovieAssocModel_1 = __importDefault(require("../models/userFavMovieAssocModel"));
// db access
class UserRepository {
    getFavoriteMoviesByUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*const user = await User.findByPk(id, {
                    attributes: ['favorite_movies'],
                });
    
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
    
                return user.favorite_movies;*/
                const queryAssoc = yield userFavMovieAssocModel_1.default.findAll();
                const queryUsers = yield userModel_1.default.findAll();
                const queryMovies = yield favoriteMovieModel_1.default.findAll();
                console.log('ASSOC: ', queryAssoc);
                console.log('Users: ', queryUsers);
                console.log('Movies: ', queryMovies);
                const userMovies = yield userFavMovieAssocModel_1.default.findAll({
                    where: { user_id: userId },
                    include: [{ model: favoriteMovieModel_1.default, as: 'favoriteMovie' }],
                });
                return userMovies.map((assoc) => (Object.assign(Object.assign({}, assoc.favoriteMovie.get()), { Notes: assoc.Notes })));
            }
            catch (error) {
                console.error(`Error fetching favorite movies: ${error}`);
                throw error;
            }
        });
    }
    ;
    addMovieToFavoritesByUserId(userId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(userId);
                if (!user) {
                    throw new Error(`User with ID ${userId} not found`);
                }
                // Check if movie already exists in favorite_movies
                let favoriteMovie = yield favoriteMovieModel_1.default.findOne({
                    where: { Title: movie.Title }
                });
                if (!favoriteMovie) {
                    favoriteMovie = yield favoriteMovieModel_1.default.create({
                        Title: movie.Title,
                        Poster: movie.Poster,
                        Year: movie.Year,
                        imdbID: movie.imdbID,
                        Genre: movie.Genre,
                        Plot: movie.Plot,
                    });
                }
                // add association
                yield userFavMovieAssocModel_1.default.create({
                    user_id: userId,
                    fav_movies_id: favoriteMovie.id,
                    Notes: movie.Notes,
                });
                return yield this.getFavoriteMoviesByUserById(userId);
            }
            catch (error) {
                console.error(`Error adding favorite movie: ${error}`);
                throw error;
            }
        });
    }
    updateFavoriteMovieByIdAndByUserId(userId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(userId);
                if (!user) {
                    throw new Error(`User with ID ${userId} not found`);
                }
                let favoriteMovie = yield favoriteMovieModel_1.default.findOne({
                    where: { imdbID: movie.imdbID }
                });
                if (!favoriteMovie) {
                    throw new Error("Movie id couldn't be found");
                }
                yield favoriteMovieModel_1.default.update({
                    Title: movie.Title,
                    Year: movie.Year,
                    Poster: movie.Poster,
                    Genre: movie.Genre,
                    Plot: movie.Plot,
                }, {
                    where: { imdbID: movie.imdbID },
                });
                if (movie.Notes) {
                    yield userFavMovieAssocModel_1.default.update({
                        Notes: movie.Notes,
                    }, {
                        where: { fav_movies_id: favoriteMovie.id }
                    });
                }
                return yield this.getFavoriteMoviesByUserById(userId);
            }
            catch (error) {
                console.error(`Error updating favorite movie: ${error}`);
                throw error;
            }
        });
    }
    ;
    deleteFavoriteMovieByIdAndByUserId(id, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(id);
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
                let favoriteMovie = yield favoriteMovieModel_1.default.findOne({
                    where: { imdbID: movieId }
                });
                const isOnlyOneUserWithThisMovie = (yield userFavMovieAssocModel_1.default.count({
                    where: { fav_movies_id: favoriteMovie.id },
                })) <= 1;
                yield userFavMovieAssocModel_1.default.destroy({
                    where: {
                        user_id: user.id,
                        fav_movies_id: favoriteMovie.id
                    }
                });
                if (isOnlyOneUserWithThisMovie) {
                    // detele movie
                    yield favoriteMovieModel_1.default.destroy({
                        where: { id: favoriteMovie.id }
                    });
                }
                return `Movie with imdbID ${movieId} removed successfully`;
                /*const favoriteMovies: MovieDTO[] = user.favorite_movies || [];
    
                if (!favoriteMovies.find(fav => fav.imdbID === movieId)) {
                    throw new Error(`Movie with imdbID ${movieId} doesn't exist`);
                }
    
                const removedMovie = favoriteMovies.filter(
                    (favMovie: MovieDTO) => favMovie.imdbID !== movieId
                );
    
                user.favorite_movies = removedMovie;
                await user.save();
    
                return `Movie with imdbID ${movieId} removed successfully`;*/
            }
            catch (error) {
                console.error(`Error deleting favorite movie: ${error}`);
                throw error;
            }
        });
    }
    ;
}
exports.default = UserRepository;
