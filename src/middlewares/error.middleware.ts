import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

function errorMiddleware(
    error: HttpException, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({
        status,
        message
    });
}

export default errorMiddleware;