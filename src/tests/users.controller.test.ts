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

  describe('modifyFavoriteMovieByIdAndByUserId', () => {
    const mockMovie = {
        Title: 'Inception Updated',
        Year: '2010',
        imdbID: 'tt1375666',
        Genre: 'Sci-Fi',
        Plot: 'An updated plot',
        Poster: 'https://example.com/poster_updated.jpg',
    };

    it('should update a favorite movie if valid data is provided', async () => {
        jest.spyOn(mockUserService.prototype, 'updateFavoriteMovieByIdAndByUserId')
            .mockResolvedValue([mockMovie]);

        mockRequest.params = { id: '1', movieId: 'tt1375666' };
        mockRequest.body = mockMovie;

        await userController.modifyFavoriteMovieByIdAndByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockUserService.prototype.updateFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith(
            1,
            mockMovie
        );

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith([mockMovie]);
    });

    it('should return validation errors if request body is invalid', async () => {
        mockRequest.params = { id: '1', movieId: 'tt1375666' };
        mockRequest.body = {};

        await userController.modifyFavoriteMovieByIdAndByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'movieId and imdbID are different/invalid',
        });
    });

    it('should return an error if movieId and imdbID are different', async () => {
        mockRequest.params = { id: '1', movieId: 'tt9999999' }
        mockRequest.body = mockMovie;

        await userController.modifyFavoriteMovieByIdAndByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'movieId and imdbID are different/invalid',
        });
    });

    it('should handle errors thrown by the service', async () => {
        const mockErrorMessage = 'Service error occurred';
        jest.spyOn(mockUserService.prototype, 'updateFavoriteMovieByIdAndByUserId')
            .mockRejectedValue(new Error(mockErrorMessage));

        mockRequest.params = { id: '1', movieId: 'tt1375666' };
        mockRequest.body = mockMovie;

        await userController.modifyFavoriteMovieByIdAndByUserId(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockUserService.prototype.updateFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith(
            1,
            mockMovie
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error',
            error: mockErrorMessage,
        });
    });
  });

  describe('removeFavoriteMovieByIdAndByUserId', () => {
    it('should remove the favorite movie and return a success message', async () => {
        const mockMessage = 'Movie with imdbID tt1375666 removed successfully';

        jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
            .mockResolvedValue(mockMessage);

        mockRequest.params = { id: '1', movieId: 'tt1375666' };

        await userController.removeFavoriteMovieByIdAndByUserId(
            mockRequest as unknown as Request<{ id: number; movieId: string }>,
            mockResponse as Response
        );

        expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'tt1375666');
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({ message: mockMessage });
    });

    it('should return an error if the service throws an exception', async () => {
        const mockErrorMessage = 'Service error occurred';

        jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
            .mockRejectedValue(new Error(mockErrorMessage));

        mockRequest.params = { id: '1', movieId: 'tt1375666' };

        await userController.removeFavoriteMovieByIdAndByUserId(
            mockRequest as unknown as Request<{ id: number; movieId: string }>,
            mockResponse as Response
        );

        expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'tt1375666');
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error',
            error: mockErrorMessage,
        });
    });

    it('should handle cases where required parameters are missing', async () => {
        mockRequest.params = { id: undefined, movieId: undefined } as any;

        await userController.removeFavoriteMovieByIdAndByUserId(
            mockRequest as unknown as Request<{ id: number; movieId: string }>,
            mockResponse as Response
        );

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error',
            error: expect.any(String),
        });
    });

    it('should return an error if the movie ID is invalid', async () => {
        const mockErrorMessage = 'Movie with imdbID invalid_id not found';

        jest.spyOn(mockUserService.prototype, 'deleteFavoriteMovieByIdAndByUserId')
            .mockRejectedValue(new Error(mockErrorMessage));

        mockRequest.params = { id: '1', movieId: 'invalid_id' };

        await userController.removeFavoriteMovieByIdAndByUserId(
            mockRequest as unknown as Request<{ id: number; movieId: string }>,
            mockResponse as Response
        );

        expect(mockUserService.prototype.deleteFavoriteMovieByIdAndByUserId).toHaveBeenCalledWith("1", 'invalid_id');
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Error',
            error: mockErrorMessage,
        });
    });
});
});