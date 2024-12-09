"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
class UserServiceFactory {
    static create() {
        const userRepository = new userRepository_1.default();
        return new userService_1.default(userRepository);
    }
}
module.exports = UserServiceFactory;
