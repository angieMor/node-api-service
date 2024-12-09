import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import MovieDTO from '../dto/movie.dto';
import UserDTO from '../dto/user.dto';

const UserServiceFactory = require('../factories/userServiceFactory')

const userService = UserServiceFactory.create();

export const generateUser = async(req: Request, res: Response) => {
    try {
        const user: Partial<UserDTO> = req.body;
        await userService.createUser(user);

        res.status(201).json({ message: 'User created' });
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
}

export const findFavoriteMoviesByUserId = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const { id } = req.params;
        const favoriteMovies = await userService.getFavoriteMoviesByUserById(id);
        if (!favoriteMovies) return res.status(200).json({ message: 'Empty favorite movies' });

        res.status(200).json(favoriteMovies);
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
};

export const includeFavoriteMovieByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const movie: Partial<MovieDTO> = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid movie data',
                errors: errors.array(),
            });
        }

        const updatedMovie = await userService.addMovieToFavoritesByUserId(userId, movie);

        return res.status(200).json(updatedMovie);
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
};

export const modifyFavoriteMovieByIdAndByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const movie: Partial<MovieDTO> = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid movie data',
                errors: errors.array(),
            });
        }

        if (movie.imdbID !== req.params.movieId) {
            return res.status(400).json({ message: 'movieId and imdbID are different/invalid' });
        }

        const modifiedMovie = await userService.updateFavoriteMovieByIdAndByUserId(userId, movie);

        return res.status(200).json(modifiedMovie);
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
};

export const removeFavoriteMovieByIdAndByUserId = async (req: Request<{
    id: number,
    movieId: string,
}>, res: Response) => {
    try {
        const userId = req.params.id;
        const movieId = req.params.movieId;

        const deletedMovie = await userService.deleteFavoriteMovieByIdAndByUserId(userId, movieId);

        return res.status(200).json({ message: deletedMovie });
    } catch (error: any) {
        res.status(400).json({ message: 'Error', error: error.message})
    }
}

export default {
    generateUser,
    findFavoriteMoviesByUserId,
    includeFavoriteMovieByUserId,
    modifyFavoriteMovieByIdAndByUserId,
    removeFavoriteMovieByIdAndByUserId,
}