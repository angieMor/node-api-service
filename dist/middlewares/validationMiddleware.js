"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginUserObject = exports.validateCreateUserObject = exports.validateFavoriteMovieObject = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.validateFavoriteMovieObject = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('id is required'),
    (0, express_validator_1.body)('Title').isString().notEmpty().withMessage('Title is required and must be a string'),
    (0, express_validator_1.body)('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    (0, express_validator_1.body)('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    (0, express_validator_1.body)('Genre').isString().notEmpty().withMessage('Genre is required and must be a string'),
    (0, express_validator_1.body)('Plot').isString().notEmpty().withMessage('Plot is required and must be a string'),
    (0, express_validator_1.body)('Poster').isURL().notEmpty().withMessage('Poster must be a valid URL'),
    (req, res, next) => {
        const errors = (0, express_validator_2.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];
exports.validateCreateUserObject = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('name is required and must be a string'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('password is required and must be a string'),
    (0, express_validator_1.body)('email').isString().notEmpty().withMessage('email is required and must be a valid email'),
    (req, res, next) => {
        const errors = (0, express_validator_2.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];
exports.validateLoginUserObject = [
    (0, express_validator_1.body)('email').isString().notEmpty().withMessage('email is required and must be a string'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('password is required and must be a string'),
    (req, res, next) => {
        const errors = (0, express_validator_2.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];
exports.default = {
    validateFavoriteMovieObject: exports.validateFavoriteMovieObject,
    validateCreateUserObject: exports.validateCreateUserObject,
    validateLoginUserObject: exports.validateLoginUserObject,
};
