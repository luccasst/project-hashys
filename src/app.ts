import * as express from 'express';
import * as cors from 'cors';
import { AppDataSource } from './database/data-source';
import AuthRouter from './routers/auth.router';
import CallRouter from './routers/call.router';

class App {
  public expressApp: express.Express;

  constructor() {
    this.expressApp = express();
    this.initialize();
    this.config();
    this.expressApp.use('/auth', AuthRouter);
    this.expressApp.use('/call', CallRouter);
  }

  private async initialize() {
    await AppDataSource.initialize();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.expressApp.use(accessControl);
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
  }


  public start(PORT: string | number):void {
    this.expressApp.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };
 
export const { expressApp } = new App();