import { Request, Response } from 'express';
import UserDTO from '../../dto/user.dto';
const AuthService = require('../services/authService');

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user: Partial<UserDTO> = req.body;
      await AuthService.register(user);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;