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
const userModel_1 = __importDefault(require("../user/models/userModel"));
const users_1 = __importDefault(require("./__mocks__/users"));
jest.mock('../user/models/userModel', () => ({
    findByPk: jest.fn(),
}));
const userRepository = new userRepository_1.default();
describe('UserRepository - getFavoriteMoviesByUserById', () => {
    it('should return favorite movies for an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = users_1.default[1];
        const mockFindByPk = jest.fn().mockResolvedValue(mockUser);
        userModel_1.default.findByPk = mockFindByPk;
        const result = yield userRepository.getFavoriteMoviesByUserById(1);
        expect(result).toEqual(mockUser.favorite_movies);
        expect(userModel_1.default.findByPk).toHaveBeenCalledWith(1, { attributes: ['favorite_movies'] });
    }));
    it('should throw an error if user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFindByPk = jest.fn().mockResolvedValue(null);
        userModel_1.default.findByPk = mockFindByPk;
        yield expect(userRepository.getFavoriteMoviesByUserById(99))
            .rejects.toThrow('User with ID 99 not found');
    }));
});
