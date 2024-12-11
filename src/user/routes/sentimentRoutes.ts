import express from 'express';
import getAllNotesFromMovie from '../controller/sentimentController';

const router = express.Router();

/**
 * @swagger
 * /sentiment-analysis/{movieId}/notes:
 *   get:
 *     summary: Gets all the notes from a specific movieId/imdbID
 *     tags:
 *       - Sentiment
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID/imdbID of the movie
 *     responses:
 *       200:
 *         description: A list of notes from the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
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
router.get('/:movieId/notes', getAllNotesFromMovie);

export default router;