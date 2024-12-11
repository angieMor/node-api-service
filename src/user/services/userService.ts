import MovieDTO from "../dto/movie.dto";
import UserRepository from "../repositories/userRepository";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    };

    async getFavoriteMoviesByUserById(userId: number) {
        return await this.userRepository.getFavoriteMoviesByUserById(userId);
    };

    async addMovieToFavoritesByUserId(userId: number, movie: MovieDTO) {
        return await this.userRepository.addMovieToFavoritesByUserId(userId, movie);
    };

    async updateFavoriteMovieByIdAndByUserId(userId: number, movie: MovieDTO) {
        return await this.userRepository.updateFavoriteMovieByIdAndByUserId(userId, movie);
    };

    async deleteFavoriteMovieByIdAndByUserId(userId: number, movieId: string) {
        return await this.userRepository.deleteFavoriteMovieByIdAndByUserId(userId, movieId);
    };
};

export default UserService;