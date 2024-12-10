"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginUserObject = exports.validateCreateUserObject = exports.validateFavoriteMovieObject = void 0;
const express_validator_1 = require("express-validator");
exports.validateFavoriteMovieObject = [
    (0, express_validator_1.param)('id'),
    (0, express_validator_1.body)('Title').isString().not().optional().withMessage('Title is required and must be a string'),
    (0, express_validator_1.body)('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    (0, express_validator_1.body)('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    (0, express_validator_1.body)('Genre').isString().notEmpty().withMessage('Genre is required and must be a string'),
    (0, express_validator_1.body)('Plot').isString().notEmpty().withMessage('Plot is required and must be a string'),
    (0, express_validator_1.body)('Poster').isURL().withMessage('Poster must be a valid URL'),
    (0, express_validator_1.body)('Notes').isString().optional(),
];
exports.validateCreateUserObject = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('name is required and must be a string'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('password is required and must be a string'),
    (0, express_validator_1.body)('email').isString().notEmpty().withMessage('email is required and must be a valid email'),
];
exports.validateLoginUserObject = [
    (0, express_validator_1.body)('email').isString().notEmpty().withMessage('email is required and must be a string'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('password is required and must be a string'),
];
exports.default = {
    validateFavoriteMovieObject: exports.validateFavoriteMovieObject,
    validateCreateUserObject: exports.validateCreateUserObject,
    validateLoginUserObject: exports.validateLoginUserObject,
};
