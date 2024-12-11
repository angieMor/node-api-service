"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sentimentController_1 = __importDefault(require("../controller/sentimentController"));
const router = express_1.default.Router();
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
router.get('/:movieId/notes', sentimentController_1.default);
exports.default = router;
