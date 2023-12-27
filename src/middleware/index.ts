require('dotenv').config();
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['imobapp_secret'];
  
    // if (token !== process.env.IMOBAPP_SECRET) {
    //   res.status(401).json({ message: 'Unauthorized' });
    // } else {
      next();
    // }
  }
}