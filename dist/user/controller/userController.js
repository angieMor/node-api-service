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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteMovieByIdAndByUserId = exports.modifyFavoriteMovieByIdAndByUserId = exports.includeFavoriteMovieByUserId = exports.findFavoriteMoviesByUserId = void 0;
const express_validator_1 = require("express-validator");
const UserServiceFactory = require('../factories/userServiceFactory');
const userService = UserServiceFactory.create();
const findFavoriteMoviesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const favoriteMovies = yield userService.getFavoriteMoviesByUserById(id);
        if (!favoriteMovies)
            return res.status(200).json({ message: 'Empty favorite movies' });
        res.status(200).json(favoriteMovies);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error: error.message });
    }
});
exports.findFavoriteMoviesByUserId = findFavoriteMoviesByUserId;
const includeFavoriteMovieByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const movie = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid movie data',
                errors: errors.array(),
            });
        }
        const updatedMovie = yield userService.addMovieToFavoritesByUserId(userId, movie);
        return res.status(200).json(updatedMovie);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error: error.message });
    }
});
exports.includeFavoriteMovieByUserId = includeFavoriteMovieByUserId;
const modifyFavoriteMovieByIdAndByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const movie = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid movie data',
                errors: errors.array(),
            });
        }
        if (movie.imdbID !== req.params.movieId) {
            return res.status(400).json({ message: 'movieId and imdbID are different/invalid' });
        }
        const modifiedMovie = yield userService.updateFavoriteMovieByIdAndByUserId(userId, movie);
        return res.status(200).json(modifiedMovie);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error: error.message });
    }
});
exports.modifyFavoriteMovieByIdAndByUserId = modifyFavoriteMovieByIdAndByUserId;
const removeFavoriteMovieByIdAndByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const movieId = req.params.movieId;
        const deletedMovie = yield userService.deleteFavoriteMovieByIdAndByUserId(userId, movieId);
        return res.status(200).json({ message: deletedMovie });
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error: error.message });
    }
});
exports.removeFavoriteMovieByIdAndByUserId = removeFavoriteMovieByIdAndByUserId;
exports.default = {
    findFavoriteMoviesByUserId: exports.findFavoriteMoviesByUserId,
    includeFavoriteMovieByUserId: exports.includeFavoriteMovieByUserId,
    modifyFavoriteMovieByIdAndByUserId: exports.modifyFavoriteMovieByIdAndByUserId,
    removeFavoriteMovieByIdAndByUserId: exports.removeFavoriteMovieByIdAndByUserId,
};
