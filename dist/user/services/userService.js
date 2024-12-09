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
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    getFavoriteMoviesByUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getFavoriteMoviesByUserById(id);
        });
    }
    ;
    addMovieToFavoritesByUserId(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.addMovieToFavoritesByUserId(id, movie);
        });
    }
    ;
    updateFavoriteMovieByIdAndByUserId(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateFavoriteMovieByIdAndByUserId(id, movie);
        });
    }
    ;
    deleteFavoriteMovieByIdAndByUserId(id, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.deleteFavoriteMovieByIdAndByUserId(id, movieId);
        });
    }
    ;
}
;
exports.default = UserService;
