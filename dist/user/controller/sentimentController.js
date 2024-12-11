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
exports.getAllNotesFromMovie = void 0;
const sentimentServiceFactory_1 = __importDefault(require("../factories/sentimentServiceFactory"));
const sentimentService = sentimentServiceFactory_1.default.create();
const getAllNotesFromMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.movieId;
        const movieNotes = yield sentimentService.findAllMovieNotes(movieId);
        if (!movieNotes) {
            res.status(200).json({ message: 'There are no movie notes' });
            return;
        }
        res.status(200).json(movieNotes);
    }
    catch (error) {
        res.status(400).json({ message: 'Error', error: error.message });
    }
});
exports.getAllNotesFromMovie = getAllNotesFromMovie;
exports.default = exports.getAllNotesFromMovie;
