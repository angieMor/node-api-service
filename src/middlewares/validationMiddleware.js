import { body, param } from 'express-validator';

const validateFavoriteMovieObject = [
    param('id').isInt().withMessage('User ID must be an integer'),
    body('Title').isString().notEmpty().withMessage('Title is required and must be a string'),
    body('Year').isString().notEmpty().withMessage('Year is required and must be a string'),
    body('imdbID').isString().notEmpty().withMessage('imdbID is required and must be a string'),
    body('Type').isString().notEmpty().withMessage('Type is required and must be a string'),
    body('Poster').isURL().withMessage('Poster must be a valid URL'),
];

export default validateFavoriteMovieObject;