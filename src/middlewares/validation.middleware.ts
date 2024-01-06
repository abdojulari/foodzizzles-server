import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validationOptions: Joi.ValidationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        
        try {
            await schema.validateAsync(req.body, validationOptions);
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).json({
                status: 400,
                message: errors.join(', ')
            });
            next(e);
        }
    }
}

export default validationMiddleware;