import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userController from '../user/controller/userController';
import UserService from '../user/services/userService';

// Mock UserService
jest.mock('../user/services/userService');
const mockUserService = jest.mocked(UserService, { shallow: false });

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

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
    it('should return favorite movies', async () => {
        jest.spyOn(mockUserService.prototype, 'getFavoriteMoviesByUserById').mockResolvedValue(mockMovies);
  
        mockRequest.params = { id: '1' };
  
        await userController.findFavoriteMoviesByUserId(
          mockRequest as Request<{ id: string }>,
          mockResponse as Response
        );
  
        expect(mockUserService.prototype.getFavoriteMoviesByUserById).toHaveBeenCalledWith(1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockMovies);
      });

    it('should return a message if no favorite movies are found', async () => {
        jest.spyOn(mockUserService.prototype, 'getFavoriteMoviesByUserById').mockResolvedValue(null);
  
        mockRequest.params = { id: '1' };
  
        await userController.findFavoriteMoviesByUserId(
          mockRequest as Request<{ id: string }>,
          mockResponse as Response
        );
  
        expect(mockUserService.prototype.getFavoriteMoviesByUserById).toHaveBeenCalledWith(1);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({ message: 'Empty favorite movies' });
      });
  });

  describe('includeFavoriteMovieByUserId', () => {
    it('should add a movie to the user\'s favorite movies list', async () => {
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

        await userController.includeFavoriteMovieByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockUserService.prototype.addMovieToFavoritesByUserId).toHaveBeenCalledWith(
            1,
            mockMovie
        );

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockMovie);
    });

    it('should return a message if no favorite movies are found', async () => {
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

        await userController.includeFavoriteMovieByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockUserService.prototype.addMovieToFavoritesByUserId).toHaveBeenCalledWith(
            1,
            mockRequest.body
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error',
            error: mockErrorMessage,
        });
    });
  });
});