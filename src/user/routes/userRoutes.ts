import express from 'express';
import {
    findFavoriteMoviesByUserId,
    includeFavoriteMovieByUserId,
    modifyFavoriteMovieByIdAndByUserId,
    removeFavoriteMovieByIdAndByUserId,
} from '../controller/userController';

import {
    validateFavoriteMovieObject
} from '../../middlewares/validationMiddleware';

const router = express.Router();

/**
 * @swagger
 * /user/{id}/favorites:
 *   get:
 *     summary: Get all the favorite movies from a specific user
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of favorite movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   imdbID:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Poster:
 *                     type: string
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   error:
 *                     type: string
 */
router.get('/:id/favorites', findFavoriteMoviesByUserId);

/**
 * @swagger
 * /user/{id}/favorites:
 *   post:
 *     summary: Adds a new favorite movie to the user's favorites list
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Title
 *               - Year
 *               - imdbID
 *               - Type
 *               - Poster
 *             properties:
 *               Title:
 *                 type: string
 *                 description: The title of the movie
 *               Year:
 *                 type: string
 *                 description: The release year of the movie
 *               imdbID:
 *                 type: string
 *                 description: The IMDb ID of the movie
 *               Type:
 *                 type: string
 *                 description: The type of the movie (e.g., movie, series, episode)
 *               Poster:
 *                 type: string
 *                 description: The URL of the movie poster
 *     responses:
 *       200:
 *         description: New favorite movie added
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   imdbID:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Poster:
 *                     type: string
 *       400:
 *         description: Invalid key/value in the movie object given
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   error:
 *                     type: string         
 */
router.post('/:id/favorites', validateFavoriteMovieObject, includeFavoriteMovieByUserId);

/**
 * @swagger
 * /user/{id}/favorites/{imdbID}:
 *   put:
 *     summary: Modify a favorite movie from the user's favorites list
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: imdbID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to edit, named imdbIDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Title
 *               - Year
 *               - imdbID
 *               - Type
 *               - Poster
 *             properties:
 *               Title:
 *                 type: string
 *                 description: The title of the movie
 *               Year:
 *                 type: string
 *                 description: The release year of the movie
 *               imdbID:
 *                 type: string
 *                 description: The IMDb ID of the movie
 *               Type:
 *                 type: string
 *                 description: The type of the movie (e.g., movie, series, episode)
 *               Poster:
 *                 type: string
 *                 description: The URL of the movie poster
 *     responses:
 *       200:
 *         description: Favorite movie edited
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   imdbID:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Poster:
 *                     type: string
 *       400:
 *         description: Invalid key/value in the movie object given
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   error:
 *                     type: string         
 */
router.put('/:id/favorites/:movieId', validateFavoriteMovieObject, modifyFavoriteMovieByIdAndByUserId);

/**
 * @swagger
 * /user/{id}/favorites/{imdbID}:
 *   delete:
 *     summary: Deletes a favorite movie from the user's favorites list
 *     tags:
 *       - User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: imdbID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete, named imdbIDs
 *     responses:
 *       200:
 *         description: Favorite movie deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *       400:
 *         description: Movie with imdbID ${movieId} doesn't exist / Error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string        
 */
router.delete('/:id/favorites/:movieId', removeFavoriteMovieByIdAndByUserId);

export default router;