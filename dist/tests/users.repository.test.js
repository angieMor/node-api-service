"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../user/repositories/userRepository"));
const userFavMovieAssocModel_1 = __importDefault(require("../user/models/userFavMovieAssocModel"));
const favoriteMovieModel_1 = __importDefault(require("../user/models/favoriteMovieModel"));
const userModel_1 = __importDefault(require("../user/models/userModel"));
jest.mock('../user/models/userFavMovieAssocModel');
jest.mock('../user/models/favoriteMovieModel');
jest.mock('../user/models/userModel');
const mockUser = jest.mocked(userModel_1.default, { shallow: false });
const mockUserFavMovieAssoc = jest.mocked(userFavMovieAssocModel_1.default, { shallow: false });
const mockFavoriteMovie = jest.mocked(favoriteMovieModel_1.default, { shallow: false });
describe('UserRepository', () => {
    const userRepository = new userRepository_1.default();
    const mockMovies = [{ id: 1, Title: 'Inception', Year: '2010', imdbID: 'tt1375666' }];
    describe('getFavoriteMoviesByUserById', () => {
        it('should return favorite movies if they exist', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock datos devueltos por la base de datos
            const mockData = [
                {
                    favoriteMovie: {
                        get: jest.fn().mockReturnValue({
                            id: 1,
                            Title: 'Inception',
                            Year: '2010',
                            imdbID: 'tt1375666',
                        }),
                    },
                    Notes: 'Amazing movie',
                },
            ];
            // Mock `UserFavMovieAssoc.findAll`
            mockUserFavMovieAssoc.findAll.mockResolvedValueOnce(mockData);
            const result = yield userRepository.getFavoriteMoviesByUserById(1);
            expect(mockUserFavMovieAssoc.findAll).toHaveBeenCalledWith({
                where: { user_id: 1 },
                include: [{ model: favoriteMovieModel_1.default, as: 'favoriteMovie' }],
            });
            expect(result).toEqual([
                {
                    id: 1,
                    Title: 'Inception',
                    Year: '2010',
                    imdbID: 'tt1375666',
                    Notes: 'Amazing movie',
                },
            ]);
        }));
        it('should throw an error if the database query fails', () => __awaiter(void 0, void 0, void 0, function* () {
            // temporary disable the console.error logs in the test results
            jest.spyOn(console, 'error').mockImplementation(() => { });
            mockUserFavMovieAssoc.findAll.mockRejectedValueOnce(new Error('Database error'));
            yield expect(userRepository.getFavoriteMoviesByUserById(1)).rejects.toThrow('Database error');
            expect(mockUserFavMovieAssoc.findAll).toHaveBeenCalledWith({
                where: { user_id: 1 },
                include: [{ model: favoriteMovieModel_1.default, as: 'favoriteMovie' }],
            });
        }));
    });
    describe('addMovieToFavoritesByUserId', () => {
        it('should add a movie to the user\'s favorites if it does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockMovie = {
                Title: 'Inception',
                Poster: 'https://example.com/poster.jpg',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
                Notes: 'Great movie',
            };
            const mockFavoriteMovieInstance = Object.assign({ id: 101 }, mockMovie);
            const mockAssociation = { id: 1, Notes: 'Great movie' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(null);
            // Mock FavoriteMovie.create
            mockFavoriteMovie.create.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock UserFavMovieAssoc.create
            mockUserFavMovieAssoc.create.mockResolvedValueOnce(mockAssociation);
            // Mock getFavoriteMoviesByUserById
            jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([
                Object.assign(Object.assign({}, mockMovie), { Notes: 'Great movie' }),
            ]);
            const result = yield userRepository.addMovieToFavoritesByUserId(1, mockMovie);
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { Title: 'Inception' } });
            expect(mockFavoriteMovie.create).toHaveBeenCalledWith({
                Title: 'Inception',
                Poster: 'https://example.com/poster.jpg',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
            });
            expect(mockUserFavMovieAssoc.create).toHaveBeenCalledWith({
                user_id: 1,
                fav_movies_id: 101,
                Notes: 'Great movie',
            });
            expect(result).toEqual([Object.assign(Object.assign({}, mockMovie), { Notes: 'Great movie' })]);
        }));
        it('should add an existing movie to the user\'s favorites', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockMovie = {
                Title: 'Inception',
                Poster: 'https://example.com/poster.jpg',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
                Notes: 'Great movie',
            };
            const mockFavoriteMovieInstance = Object.assign({ id: 101 }, mockMovie);
            const mockAssociation = { id: 1, Notes: 'Great movie' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock UserFavMovieAssoc.create
            mockUserFavMovieAssoc.create.mockResolvedValueOnce(mockAssociation);
            jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([
                Object.assign(Object.assign({}, mockMovie), { Notes: 'Great movie' }),
            ]);
            const result = yield userRepository.addMovieToFavoritesByUserId(1, mockMovie);
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { Title: 'Inception' } });
            expect(mockFavoriteMovie.create).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.create).toHaveBeenCalledWith({
                user_id: 1,
                fav_movies_id: 101,
                Notes: 'Great movie',
            });
            expect(result).toEqual([Object.assign(Object.assign({}, mockMovie), { Notes: 'Great movie' })]);
        }));
        it('should throw an error if the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMovie = { Title: 'Inception' };
            mockUser.findByPk.mockResolvedValueOnce(null);
            yield expect(userRepository.addMovieToFavoritesByUserId(1, mockMovie)).rejects.toThrow('User with ID 1 not found');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
            expect(mockFavoriteMovie.create).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.create).not.toHaveBeenCalled();
        }));
        it('should throw an error if there is a database error', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMovie = { Title: 'Inception' };
            mockUser.findByPk.mockRejectedValueOnce(new Error('Database error'));
            yield expect(userRepository.addMovieToFavoritesByUserId(1, mockMovie)).rejects.toThrow('Database error');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
        }));
    });
    describe('updateFavoriteMovieByIdAndByUserId', () => {
        it('should update a favorite movie and its notes if they exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' };
            const mockMovie = {
                imdbID: 'tt1375666',
                Title: 'Inception Updated',
                Year: '2011',
                Poster: 'https://example.com/poster_updated.jpg',
                Genre: 'Sci-Fi',
                Plot: 'Updated plot',
                Notes: 'Updated notes',
            };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock FavoriteMovie.update
            mockFavoriteMovie.update.mockResolvedValueOnce([1]); // Returns number of rows affected
            // Mock UserFavMovieAssoc.update
            mockUserFavMovieAssoc.update.mockResolvedValueOnce([1]); // Returns number of rows affected
            // Mock getFavoriteMoviesByUserById
            jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([mockMovie]);
            const result = yield userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie);
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockFavoriteMovie.update).toHaveBeenCalledWith({
                Title: 'Inception Updated',
                Year: '2011',
                Poster: 'https://example.com/poster_updated.jpg',
                Genre: 'Sci-Fi',
                Plot: 'Updated plot',
            }, { where: { imdbID: 'tt1375666' } });
            expect(mockUserFavMovieAssoc.update).toHaveBeenCalledWith({ Notes: 'Updated notes' }, { where: { fav_movies_id: 101 } });
            expect(result).toEqual([mockMovie]);
        }));
        it('should throw an error if the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMovie = { imdbID: 'tt1375666' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(null);
            yield expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow('User with ID 1 not found');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
            expect(mockFavoriteMovie.update).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
        }));
        it('should throw an error if the movie does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockMovie = { imdbID: 'tt1375666' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(null);
            yield expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow("Movie id couldn't be found");
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockFavoriteMovie.update).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
        }));
        it('should update the movie details but not the notes if notes are not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' };
            const mockMovie = {
                imdbID: 'tt1375666',
                Title: 'Inception Updated',
                Year: '2011',
                Poster: 'https://example.com/poster_updated.jpg',
                Genre: 'Sci-Fi',
                Plot: 'Updated plot',
            };
            const updatedMovies = [
                {
                    imdbID: 'tt1375666',
                    Title: 'Inception Updated',
                    Year: '2011',
                    Poster: 'https://example.com/poster_updated.jpg',
                    Genre: 'Sci-Fi',
                    Plot: 'Updated plot',
                    Notes: null, // No notes provided
                },
            ];
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock FavoriteMovie.update
            mockFavoriteMovie.update.mockResolvedValueOnce([1]); // Returns number of rows affected
            // Mock getFavoriteMoviesByUserById
            jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce(updatedMovies);
            const result = yield userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie);
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockFavoriteMovie.update).toHaveBeenCalledWith({
                Title: 'Inception Updated',
                Year: '2011',
                Poster: 'https://example.com/poster_updated.jpg',
                Genre: 'Sci-Fi',
                Plot: 'Updated plot',
            }, { where: { imdbID: 'tt1375666' } });
            // Notes shouldn't be updated in the UserFavMovieAssoc model because they we're not provided
            expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
            expect(result).toEqual(updatedMovies);
        }));
        it('should throw an error if the database operation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMovie = { imdbID: 'tt1375666' };
            // Mock User.findByPk to throw an error
            mockUser.findByPk.mockRejectedValueOnce(new Error('Database error'));
            yield expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow('Database error');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
        }));
    });
    describe('deleteFavoriteMovieByIdAndByUserId', () => {
        it('should delete a favorite movie association and the movie itself if no other users have it', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock UserFavMovieAssoc.count to simulate only one user has this movie
            mockUserFavMovieAssoc.count.mockResolvedValueOnce(1);
            // Mock UserFavMovieAssoc.destroy
            mockUserFavMovieAssoc.destroy.mockResolvedValueOnce(1); // 1 row deleted
            // Mock FavoriteMovie.destroy
            mockFavoriteMovie.destroy.mockResolvedValueOnce(1); // 1 row deleted
            const result = yield userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockUserFavMovieAssoc.count).toHaveBeenCalledWith({ where: { fav_movies_id: 101 } });
            expect(mockUserFavMovieAssoc.destroy).toHaveBeenCalledWith({
                where: { user_id: 1, fav_movies_id: 101 }
            });
            expect(mockFavoriteMovie.destroy).toHaveBeenCalledWith({ where: { id: 101 } });
            expect(result).toBe('Movie with imdbID tt1375666 removed successfully');
        }));
        it('should delete only the favorite movie association if other users have the movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);
            // Mock UserFavMovieAssoc.count to simulate multiple users have this movie
            mockUserFavMovieAssoc.count.mockResolvedValueOnce(2);
            // Mock UserFavMovieAssoc.destroy
            mockUserFavMovieAssoc.destroy.mockResolvedValueOnce(1); // 1 row deleted
            const result = yield userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockUserFavMovieAssoc.count).toHaveBeenCalledWith({ where: { fav_movies_id: 101 } });
            expect(mockUserFavMovieAssoc.destroy).toHaveBeenCalledWith({
                where: { user_id: 1, fav_movies_id: 101 }
            });
            expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
            expect(result).toBe('Movie with imdbID tt1375666 removed successfully');
        }));
        it('should throw an error if the user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(null);
            yield expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow('User with ID 1 not found');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
            expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
        }));
        it('should throw an error if the movie does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne
            mockFavoriteMovie.findOne.mockResolvedValueOnce(null);
            yield expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow("Movie with imdbID tt1375666 doesn't exist");
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
            expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
        }));
        it('should throw an error if the database operation fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUserInstance = { id: 1 };
            // Mock User.findByPk
            mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
            // Mock FavoriteMovie.findOne to throw an error
            mockFavoriteMovie.findOne.mockRejectedValueOnce(new Error('Database error'));
            yield expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow('Database error');
            expect(mockUser.findByPk).toHaveBeenCalledWith(1);
            expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
            expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
            expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
            expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
        }));
    });
});
