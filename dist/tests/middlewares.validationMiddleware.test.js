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
Object.defineProperty(exports, "__esModule", { value: true });
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const express_validator_1 = require("express-validator");
describe('Validation Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockImplementation(() => mockResponse);
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
        it('should return validation errors if favoriteMovie body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { id: '1' };
            mockRequest.body = {};
            for (const middleware of validationMiddleware_1.validateFavoriteMovieObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            const filteredErrors = errors.array().filter(error => error.msg !== 'Invalid value'); // filters generic errors
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(6);
            expect(filteredErrors).toEqual(expect.arrayContaining([
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
            ]));
        }));
        it('should call next if body is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.params = { id: '1' };
            mockRequest.body = {
                Title: 'Inception',
                Year: '2010',
                imdbID: 'tt1375666',
                Genre: 'Sci-Fi',
                Plot: 'A mind-bending thriller',
                Poster: 'https://example.com/poster.jpg',
            };
            for (const middleware of validationMiddleware_1.validateFavoriteMovieObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            expect(errors.isEmpty()).toBe(true);
            // should pass to the next middleware
            expect(nextFunction).toHaveBeenCalled();
        }));
    });
    describe('validateCreateUserObject', () => {
        it('should return validation errors if createUser body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {};
            for (const middleware of validationMiddleware_1.validateCreateUserObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            const filteredErrors = errors.array().filter(error => error.msg !== 'Invalid value');
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(3);
            expect(filteredErrors).toEqual(expect.arrayContaining([
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
            ]));
        }));
        it('should call next if createUser body is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                name: 'John Doe',
                password: '123456',
                email: 'john.doe@example.com',
            };
            for (const middleware of validationMiddleware_1.validateCreateUserObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            expect(errors.isEmpty()).toBe(true);
            expect(nextFunction).toHaveBeenCalled();
        }));
    });
    describe('validateLoginUserObject', () => {
        it('should return validation errors if loginUser body is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {};
            for (const middleware of validationMiddleware_1.validateLoginUserObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            const filteredErrors = errors.array().filter(error => error.msg !== 'Invalid value');
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(filteredErrors.length).toBe(2);
            expect(filteredErrors).toEqual(expect.arrayContaining([
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
            ]));
        }));
        it('should call next if loginUser body is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                email: 'john.doe@example.com',
                password: 'securepassword',
            };
            for (const middleware of validationMiddleware_1.validateLoginUserObject) {
                yield middleware(mockRequest, mockResponse, nextFunction);
            }
            const errors = (0, express_validator_1.validationResult)(mockRequest);
            expect(errors.isEmpty()).toBe(true);
            expect(nextFunction).toHaveBeenCalled();
        }));
    });
});
