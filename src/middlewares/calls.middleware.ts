import { Request, Response, NextFunction } from 'express';

export default class CallsMiddleware {
  public static async callsBodyValidation(req: Request, res: Response, next: NextFunction) {
    const { title, comment, status, priority } = req.body;
    if (title === '' || title === undefined) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (comment === '' || comment === undefined) {
      return res.status(400).json({ message: 'Comment is required' });
    }
    if (status === '' || status === undefined) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (priority === '' || priority === undefined) {
      return res.status(400).json({ message: 'Priority is required' });
    }
    next();
  }

  public static async callsPriorityValidation(req: Request, res: Response, next: NextFunction) {
    const { priority } = req.body;
    if (priority !== 'pequena' && priority !== 'normal' && priority !== 'alta') {
      return res.status(400).json({ message: 'Priority must be "pequena", "normal" or "alta"' });
    }
    next();
  }
  
  public static async callsIdValidation(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (id === '' || id === undefined) {
      return res.status(400).json({ message: 'Id is required' });
    }
    next();
  }
}