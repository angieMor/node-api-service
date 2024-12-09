import MovieDTO from "../dto/movie.dto";
import UserRepository from "../repositories/userRepository";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    };

    async getFavoriteMoviesByUserById(id: number) {
        return await this.userRepository.getFavoriteMoviesByUserById(id);
    };

    async addMovieToFavoritesByUserId(id: number, movie: MovieDTO) {
        return await this.userRepository.addMovieToFavoritesByUserId(id, movie);
    };

    async updateFavoriteMovieByIdAndByUserId(id: number, movie: MovieDTO) {
        return await this.userRepository.updateFavoriteMovieByIdAndByUserId(id, movie);
    };

    async deleteFavoriteMovieByIdAndByUserId(id: number, movieId: string) {
        return await this.userRepository.deleteFavoriteMovieByIdAndByUserId(id, movieId);
    };
};

export default UserService;