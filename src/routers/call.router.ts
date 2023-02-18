import * as express from 'express';
import CallController from '../controllers/call.controller';
import TokenMiddleware from '../middlewares/token.middleware';
import CallsMiddleware from '../middlewares/calls.middleware';

const CallRouter = express.Router();

CallRouter.post(
  '/',
  TokenMiddleware.tokenValidation,
  TokenMiddleware.roleAdminOrUserValidation,
  CallsMiddleware.callsBodyValidation,
  CallsMiddleware.callsPriorityValidation,
  CallController.createCall
);

CallRouter.get(
  '/',
  TokenMiddleware.tokenValidation,
  TokenMiddleware.roleAdminValidation,
  CallController.getAllCalls
);

CallRouter.get(
  '/:id',
  TokenMiddleware.tokenValidation,
  CallsMiddleware.callsIdValidation,
  TokenMiddleware.roleAdminValidation,
  CallController.getCallById
);

CallRouter.put(
  '/:id',
  TokenMiddleware.tokenValidation,
  CallsMiddleware.callsIdValidation,
  TokenMiddleware.roleAdminValidation,
  CallsMiddleware.callsBodyValidation,
  CallsMiddleware.callsPriorityValidation,
  CallController.updateCallById
);

CallRouter.delete(
  '/:id',
  TokenMiddleware.tokenValidation,
  CallsMiddleware.callsIdValidation,
  TokenMiddleware.roleAdminValidation,
  CallController.deleteCallById
);

export default CallRouter;