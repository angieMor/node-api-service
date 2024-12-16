import { body, param } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateFavoriteMovieObject = [
    param('id').notEmpty().withMessage('id is required'),
    body('Title').isString().notEmpty().withMessage('Title is required and must be a string'),
    body('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    body('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    body('Genre').isString().notEmpty().withMessage('Genre is required and must be a string'),
    body('Plot').isString().notEmpty().withMessage('Plot is required and must be a string'),
    body('Poster').isURL().notEmpty().withMessage('Poster must be a valid URL'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];

export const validateCreateUserObject = [
    body('name').isString().notEmpty().withMessage('name is required and must be a string'),
    body('password').isString().notEmpty().withMessage('password is required and must be a string'),
    body('email').isString().notEmpty().withMessage('email is required and must be a valid email'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];

export const validateLoginUserObject = [
    body('email').isString().notEmpty().withMessage('email is required and must be a string'),
    body('password').isString().notEmpty().withMessage('password is required and must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array(),
            });
        }
        next();
    },
];

export default {
    validateFavoriteMovieObject,
    validateCreateUserObject,
    validateLoginUserObject,
};