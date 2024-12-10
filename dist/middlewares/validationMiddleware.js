"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserObject = exports.validateFavoriteMovieObject = void 0;
const express_validator_1 = require("express-validator");
exports.validateFavoriteMovieObject = [
    (0, express_validator_1.param)('id').isInt().withMessage('User ID must be an integer'),
    (0, express_validator_1.body)('Title').isString().notEmpty().withMessage('Title is required and must be a string'),
    (0, express_validator_1.body)('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    (0, express_validator_1.body)('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    (0, express_validator_1.body)('Type').isString().notEmpty().withMessage('Type is required and must be a string'),
    (0, express_validator_1.body)('Poster').isURL().withMessage('Poster must be a valid URL'),
];
exports.validateUserObject = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('name is required and must be a string'),
    (0, express_validator_1.body)('email').isEmail().notEmpty().withMessage('email is required and must be a valid email'),
];
exports.default = {
    validateFavoriteMovieObject: exports.validateFavoriteMovieObject,
    validateUserObject: exports.validateUserObject
};
