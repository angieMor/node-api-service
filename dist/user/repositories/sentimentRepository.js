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
const favoriteMovieModel_1 = __importDefault(require("../models/favoriteMovieModel"));
const userFavMovieAssocModel_1 = __importDefault(require("../models/userFavMovieAssocModel"));
class SentimentRepository {
    findAllMovieNotes(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favoriteMovie = yield favoriteMovieModel_1.default.findOne({
                where: { imdbID: movieId }
            });
            const associations = yield userFavMovieAssocModel_1.default.findAll({
                where: { fav_movies_id: favoriteMovie.id },
                attributes: ['Notes'],
            });
            return associations.map((assoc) => assoc.Notes);
        });
    }
}
;
exports.default = SentimentRepository;
