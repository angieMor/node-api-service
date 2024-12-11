import FavoriteMovie from "../models/favoriteMovieModel";
import UserFavMovieAssoc from "../models/userFavMovieAssocModel";

class SentimentRepository {
    async findAllMovieNotes(movieId: string) {
        const favoriteMovie = await FavoriteMovie.findOne({
            where: {imdbID: movieId}
        });

        const associations = await UserFavMovieAssoc.findAll({
            where: { fav_movies_id: favoriteMovie.id },
            attributes: ['Notes'],
        });

        return associations.map((assoc: any) => assoc.Notes);
    }
};

export default SentimentRepository;