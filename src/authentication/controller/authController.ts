import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateUserDTO, LoginUserDTO } from '../../user/dto/user.dto';
import AuthService from '../services/authService';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          res.status(400).json({
              message: 'Invalid user creation data',
              errors: errors.array(),
          });
          return;
      }

      const user: CreateUserDTO = req.body;

      await AuthService.register(user);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          res.status(400).json({
              message: 'Invalid user login data',
              errors: errors.array(),
          });
          return;
      }

      const { email, password } : LoginUserDTO = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;