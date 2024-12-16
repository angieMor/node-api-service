import {
    validateCreateUserObject,
    validateFavoriteMovieObject,
    validateLoginUserObject
} from '../middlewares/validationMiddleware';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

describe('Validation Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockImplementation(() => mockResponse as Response);

        mockRequest = {
            params: {},
            body: {},
        };

        mockResponse = {
            status: mockStatus,
            json: mockJson,
        };

        nextFunction = jest.fn();
    });

    describe('validateFavoriteMovieObject', () => {
        it('should return validation errors if favoriteMovie body is invalid', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = {};
    
            for (const middleware of validateFavoriteMovieObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
            const filteredErrors = errors.array().filter(
                error => error.msg !== 'Invalid value'
            ); // filters generic errors
    
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(6);
    
            expect(filteredErrors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'Title is required and must be a string',
                        path: 'Title',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'Year is required and must be a string',
                        path: 'Year',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'imdbID is required and must be a string',
                        path: 'imdbID',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'Genre is required and must be a string',
                        path: 'Genre',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'Plot is required and must be a string',
                        path: 'Plot',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'Poster must be a valid URL',
                        path: 'Poster',
                        location: 'body',
                    }),
                ])
            );
        });
    
        it('should call next if body is valid', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = {
                Title: 'Inception',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
                Poster: 'https://example.com/poster.jpg',
            };
    
            for (const middleware of validateFavoriteMovieObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
            expect(errors.isEmpty()).toBe(true);
    
            // should pass to the next middleware
            expect(nextFunction).toHaveBeenCalled();
        });
    });

    describe('validateCreateUserObject', () => {
        it('should return validation errors if createUser body is invalid', async () => {
            mockRequest.body = {};
    
            for (const middleware of validateCreateUserObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
    
            const filteredErrors = errors.array().filter(
                error => error.msg !== 'Invalid value'
            );
    
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(3);
    
            expect(filteredErrors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'name is required and must be a string',
                        path: 'name',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'password is required and must be a string',
                        path: 'password',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'email is required and must be a valid email',
                        path: 'email',
                        location: 'body',
                    }),
                ])
            );
        });
    
        it('should call next if createUser body is valid', async () => {
            mockRequest.body = {
                name: 'John Doe',
                password: '123456',
                email: 'john.doe@example.com',
            };
    
            for (const middleware of validateCreateUserObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
            expect(errors.isEmpty()).toBe(true);
    
            expect(nextFunction).toHaveBeenCalled();
        });
    });

    describe('validateLoginUserObject', () => {
        it('should return validation errors if loginUser body is invalid', async () => {
            mockRequest.body = {};
    
            for (const middleware of validateLoginUserObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
    
            const filteredErrors = errors.array().filter(
                error => error.msg !== 'Invalid value'
            );
    
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(2);
    
            expect(filteredErrors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'email is required and must be a string',
                        path: 'email',
                        location: 'body',
                    }),
                    expect.objectContaining({
                        msg: 'password is required and must be a string',
                        path: 'password',
                        location: 'body',
                    }),
                ])
            );
        });
    
        it('should call next if loginUser body is valid', async () => {
            mockRequest.body = {
                email: 'john.doe@example.com',
                password: 'securepassword',
            };
    
            for (const middleware of validateLoginUserObject) {
                await middleware(
                    mockRequest as Request,
                    mockResponse as Response,
                    nextFunction
                );
            }
    
            const errors = validationResult(mockRequest as Request);
            expect(errors.isEmpty()).toBe(true);
    
            expect(nextFunction).toHaveBeenCalled();
        });
    });
});