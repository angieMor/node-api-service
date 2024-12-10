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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../user/models/userModel"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';
class AuthService {
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield bcrypt_1.default.hash(user.password, 10);
            return yield userModel_1.default.create(user);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error('Invalid password');
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h',
            });
            return { token, user };
        });
    }
}
exports.default = AuthService;
