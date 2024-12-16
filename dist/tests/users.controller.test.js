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
            jest.spyOn(mockUserService.prototype, 'addMovieToFavoritesByUserId').mockResolvedValue(mockMovies);
            jest.mock('express-validator', () => (Object.assign(Object.assign({}, jest.requireActual('express-validator')), { validationResult: jest.fn() })));
            mockRequest.params = { id: '1' };
            mockRequest.body = mockMovies;
            yield userController_1.default.includeFavoriteMovieByUserId(mockRequest, mockResponse);
            expect(mockUserService.prototype.addMovieToFavoritesByUserId).toHaveBeenCalledWith(1, mockMovies);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockMovies);
        }));
        // TODO: THIS ONE SHOULD GO TO THE CONTROLLER TESTS
        /*it('should return validation errors if request body is invalid', async () => {
          jest.mock('express-validator', () => ({
            ...jest.requireActual('express-validator'),
            validationResult: jest.fn(),
          }));
    
          const mockValidationResult = validationResult as jest.Mock;
          mockValidationResult.mockReturnValueOnce({
              isEmpty: () => false, // Indica que hay errores de validación
              array: () => [{ msg: 'Invalid movie data' }], // Simula un error de validación
          });
    
          await userController.includeFavoriteMovieByUserId(
            mockRequest as Request,
            mockResponse as Response
          );
    
          expect(mockStatus).toHaveBeenCalledWith(400);
          expect(mockJson).toHaveBeenCalledWith({
            message: 'Invalid movie data',
            errors: [{ msg: 'Invalid movie data' }],
          });
        });*/
    });
});
