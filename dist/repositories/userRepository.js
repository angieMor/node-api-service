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
// db access
class UserRepository {
    getFavoriteMoviesByUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(id, {
                    attributes: ['favorite_movies'],
                });
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
                return user.favorite_movies;
            }
            catch (error) {
                console.error(`Error fetching favorite movies: ${error}`);
                throw error;
            }
        });
    }
    addMovieToFavoritesByUserId(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(id);
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
                const favoriteMovies = user.favorite_movies || [];
                favoriteMovies.push(movie);
                yield userModel_1.default.update({ favorite_movies: favoriteMovies }, { where: { id } });
                return favoriteMovies;
            }
            catch (error) {
                console.error(`Error adding favorite movie: ${error}`);
                throw error;
            }
        });
    }
    updateFavoriteMovieByIdAndByUserId(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(id);
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
                const favoriteMovies = user.favorite_movies || [];
                const updatedMovies = favoriteMovies.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
                updatedMovies.push(movie);
                yield userModel_1.default.update({ favorite_movies: updatedMovies }, { where: { id } });
                return updatedMovies;
            }
            catch (error) {
                console.error(`Error updating favorite movie: ${error}`);
                throw error;
            }
        });
    }
    deleteFavoriteMovieByIdAndByUserId(id, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(id);
                if (!user) {
                    throw new Error(`User with ID ${id} not found`);
                }
                const favoriteMovies = user.favorite_movies || [];
                if (!favoriteMovies.find(fav => fav.imdbID === movieId)) {
                    throw new Error(`Movie with imdbID ${movieId} doesn't exist`);
                }
                const removedMovie = favoriteMovies.filter((favMovie) => favMovie.imdbID !== movieId);
                user.favorite_movies = removedMovie;
                yield user.save();
                return `Movie with imdbID ${movieId} removed successfully`;
            }
            catch (error) {
                console.error(`Error deleting favorite movie: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
