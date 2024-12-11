import { body, param } from 'express-validator';

export const validateFavoriteMovieObject = [
    param('id'),
    body('Title').isString().not().optional().withMessage('Title is required and must be a string'),
    body('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    body('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    body('Genre').isString().notEmpty().withMessage('Genre is required and must be a string'),
    body('Plot').isString().notEmpty().withMessage('Plot is required and must be a string'),
    body('Poster').isURL().withMessage('Poster must be a valid URL'),
];

export const validateCreateUserObject = [
    body('name').isString().notEmpty().withMessage('name is required and must be a string'),
    body('password').isString().notEmpty().withMessage('password is required and must be a string'),
    body('email').isString().notEmpty().withMessage('email is required and must be a valid email'),
];

export const validateLoginUserObject = [
    body('email').isString().notEmpty().withMessage('email is required and must be a string'),
    body('password').isString().notEmpty().withMessage('password is required and must be a string'),
];

export default {
    validateFavoriteMovieObject,
    validateCreateUserObject,
    validateLoginUserObject,
};