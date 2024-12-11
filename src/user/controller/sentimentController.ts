import SentimentServiceFactory from "../factories/sentimentServiceFactory";
import { Request, Response } from 'express';

const sentimentService = SentimentServiceFactory.create();

export const getAllNotesFromMovie = async (
    req: Request<{ movieId: string }>,
    res: Response,
) => {
    try {
        const movieId = req.params.movieId;
        const movieNotes = await sentimentService.findAllMovieNotes(movieId);

        if(!movieNotes) {
            res.status(200).json({ message: 'There are no movie notes' });
            return;
        }

        res.status(200).json(movieNotes);
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
};

export default getAllNotesFromMovie;