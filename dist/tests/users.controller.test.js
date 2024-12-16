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
const userController_1 = __importDefault(require("../user/controller/userController"));
const userService_1 = __importDefault(require("../user/services/userService"));
// Mock UserService
jest.mock('../user/services/userService');
const mockUserService = jest.mocked(userService_1.default, { shallow: false });
describe('UserController', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockRequest = {
            params: {},
            body: {},
        };
        mockResponse = {
            status: mockStatus,
        };
        jest.clearAllMocks();
        jest.resetModules();
    });
    const mockMovies = [{ id: 1, Title: 'Inception', Year: '2010', imdbID: 'tt1375666' }];
    describe('findFavoriteMoviesByUserId', () => {
        it('should return favorite movies', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockUserService.prototype, 'getFavoriteMoviesByUserById').mockResolvedValue(mockMovies);
            mockRequest.params = { id: '1' };
            yield userController_1.default.findFavoriteMoviesByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.getFavoriteMoviesByUserById).toHaveBeenCalledWith(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockMovies);
        }));
        it('should return a message if no favorite movies are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockUserService.prototype, 'getFavoriteMoviesByUserById').mockResolvedValue(null);
            mockRequest.params = { id: '1' };
            yield userController_1.default.findFavoriteMoviesByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.getFavoriteMoviesByUserById).toHaveBeenCalledWith(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Empty favorite movies' });
        }));
    });
    describe('includeFavoriteMovieByUserId', () => {
        it('should add a movie to the user\'s favorite movies list', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.unmock('express-validator');
            const mockMovie = {
                Title: 'Inception',
                Year: '2010',
                id: 1,
                imdbID: 'tt1375666',
            };
            jest.spyOn(mockUserService.prototype, 'addMovieToFavoritesByUserId').mockResolvedValue(mockMovie);
            mockRequest.params = { id: '1' };
            mockRequest.body = mockMovie;
            yield userController_1.default.includeFavoriteMovieByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.addMovieToFavoritesByUserId).toHaveBeenCalledWith(1, mockMovie);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockMovie);
        }));
        it('should return a message if no favorite movies are found', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorMessage = 'Something went wrong';
            jest.spyOn(mockUserService.prototype, 'addMovieToFavoritesByUserId')
                .mockRejectedValue(new Error(mockErrorMessage));
            mockRequest.params = { id: '1' };
            mockRequest.body = {
                Title: 'Inception',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
                Poster: 'https://example.com/poster.jpg',
            };
            yield userController_1.default.includeFavoriteMovieByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.addMovieToFavoritesByUserId).toHaveBeenCalledWith(1, mockRequest.body);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Error',
                error: mockErrorMessage,
            });
        }));
    });
    describe('modifyFavoriteMovieByIdAndByUserId', () => {
        const mockMovie = {
            Title: 'Inception Updated',
            Year: '2010',
            imdbID: 'tt1375666',
            Genre: 'Sci-Fi',
            Plot: 'An updated plot',
            Poster: 'https://example.com/poster_updated.jpg',
        };
        it('should update a favorite movie if valid data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockUserService.prototype, 'updateFavoriteMovieByIdAndByUserId')
                .mockResolvedValue([mockMovie]);
            mockRequest.params = { id: '1', movieId: 'tt1375666' };
            mockRequest.body = mockMovie;
            yield userController_1.default.modifyFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.updateFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith(1, mockMovie);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith([mockMovie]);
        }));
        it('should return validation errors if request body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { id: '1', movieId: 'tt1375666' };
            mockRequest.body = {};
            yield userController_1.default.modifyFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'movieId and imdbID are different/invalid',
            });
        }));
        it('should return an error if movieId and imdbID are different', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { id: '1', movieId: 'tt9999999' };
            mockRequest.body = mockMovie;
            yield userController_1.default.modifyFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'movieId and imdbID are different/invalid',
            });
        }));
        it('should handle errors thrown by the service', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorMessage = 'Service error occurred';
            jest.spyOn(mockUserService.prototype, 'updateFavoriteMovieByIdAndByUserId')
                .mockRejectedValue(new Error(mockErrorMessage));
            mockRequest.params = { id: '1', movieId: 'tt1375666' };
            mockRequest.body = mockMovie;
            yield userController_1.default.modifyFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.updateFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith(1, mockMovie);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Error',
                error: mockErrorMessage,
            });
        }));
    });
    describe('removeFavoriteMovieByIdAndByUserId', () => {
        it('should remove the favorite movie and return a success message', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = 'Movie with imdbID tt1375666 removed successfully';
            jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
                .mockResolvedValue(mockMessage);
            mockRequest.params = { id: '1', movieId: 'tt1375666' };
            yield userController_1.default.removeFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'tt1375666');
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ message: mockMessage });
        }));
        it('should return an error if the service throws an exception', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorMessage = 'Service error occurred';
            jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
                .mockRejectedValue(new Error(mockErrorMessage));
            mockRequest.params = { id: '1', movieId: 'tt1375666' };
            yield userController_1.default.removeFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'tt1375666');
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Error',
                error: mockErrorMessage,
            });
        }));
        it('should handle cases where required parameters are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { id: undefined, movieId: undefined };
            yield userController_1.default.removeFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            //expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).not.toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Error',
                error: expect.any(String),
            });
        }));
        it('should return an error if the movie ID is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorMessage = 'Movie with imdbID invalid_id not found';
            jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
                .mockRejectedValue(new Error(mockErrorMessage));
            mockRequest.params = { id: '1', movieId: 'invalid_id' };
            yield userController_1.default.removeFavoriteMovieByIdAndByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'invalid_id');
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Error',
                error: mockErrorMessage,
            });
        }));
    });
});
