"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sentimentRepository_1 = __importDefault(require("../repositories/sentimentRepository"));
const sentimentService_1 = __importDefault(require("../services/sentimentService"));
class SentimentServiceFactory {
    static create() {
        const sentimentRepository = new sentimentRepository_1.default();
        return new sentimentService_1.default(sentimentRepository);
    }
}
exports.default = SentimentServiceFactory;
