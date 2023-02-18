import * as express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from  '../middlewares/auth.middleware';
const AuthRouter = express.Router();

AuthRouter.post(
  '/',
  AuthMiddleware.emailValidation,
  AuthMiddleware.roleValidation,
  AuthController.createUser
);

AuthRouter.post(
  '/login',
  AuthMiddleware.emailValidation,
  AuthMiddleware.passwordValidation,
  AuthController.loginUser
);

export default AuthRouter;