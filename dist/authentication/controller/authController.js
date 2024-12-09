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
const AuthService = require('../services/authService');
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                yield AuthService.register(user);
                res.status(201).json({ message: 'User registered successfully' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { token, user } = yield AuthService.login(email, password);
                res.status(200).json({ message: 'Login successful', token, user });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
module.exports = AuthController;
