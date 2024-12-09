import User from "../models/userModel";
import MovieDTO from "../dto/movie.dto";

// db access
class UserRepository {
    async getFavoriteMoviesByUserById(id: number) {
        try {
            const user = await User.findByPk(id, {
                attributes: ['favorite_movies'],
            });

            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            return user.favorite_movies;
        } catch (error: any) {
            console.error(`Error fetching favorite movies: ${error}`);
            throw error;
        }
    };

    async addMovieToFavoritesByUserId(id: number, movie: MovieDTO) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            const favoriteMovies = user.favorite_movies || [];
            favoriteMovies.push(movie);

            await User.update(
                { favorite_movies: favoriteMovies },
                { where: { id } }
            );

            return favoriteMovies;
        } catch (error: any) {
            console.error(`Error adding favorite movie: ${error}`);
            throw error;
        }
    };

    async updateFavoriteMovieByIdAndByUserId(id: number, movie: MovieDTO) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            const favoriteMovies: MovieDTO[] = user.favorite_movies || [];

            const updatedMovies = favoriteMovies.filter(
                (favMovie: MovieDTO) => favMovie.imdbID !== movie.imdbID
            );

            updatedMovies.push(movie);

            await User.update(
                { favorite_movies: updatedMovies },
                { where: { id } }
            );

            return updatedMovies;
        } catch (error: any) {
            console.error(`Error updating favorite movie: ${error}`);
            throw error;
        }
    };

    async deleteFavoriteMovieByIdAndByUserId(id: number, movieId: string) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            const favoriteMovies: MovieDTO[] = user.favorite_movies || [];

            if (!favoriteMovies.find(fav => fav.imdbID === movieId)) {
                throw new Error(`Movie with imdbID ${movieId} doesn't exist`);
            }

            const removedMovie = favoriteMovies.filter(
                (favMovie: MovieDTO) => favMovie.imdbID !== movieId
            );

            user.favorite_movies = removedMovie;
            await user.save();

            return `Movie with imdbID ${movieId} removed successfully`;
        } catch (error: any) {
            console.error(`Error deleting favorite movie: ${error}`);
            throw error;
        }
    };
}

export default UserRepository;