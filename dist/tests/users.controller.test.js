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
            // Verifica que se devolvió el status y el json correctos
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
});
