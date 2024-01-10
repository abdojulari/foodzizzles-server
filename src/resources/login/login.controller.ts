import {  Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import HttpException from '../../utils/exceptions/http.exception';
import Controller from '../../utils/interfaces/controller.interface';

class LoginController implements Controller {
    public path = '/login';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *     login:   
     *       type: object
     *       properties:
     *          password:
     *             type: string
     *             description: user password
     *             example: ajjsjweee
     *          email:
     *              type: string
     *              description: user email
     *              example: joe@example.com       
     * 
     */
    private initializeRoutes(): void {
        /**
         * @swagger
         * /api/login:
         *   post:
         *     tags:
         *       - Authentication
         *     description: User login API
         *     summary: Log in users
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 description: User email
         *                 example: joe@example.com
         *               password:
         *                 type: string
         *                 description: User password
         *                 example: 12345
         *     responses:
         *       200:
         *         description: Successfully logged in
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 user:
         *                   $ref: '#/components/schemas/users'
         *                 token:
         *                   type: string
         *                   description: JWT token
         */
        this.router.post(`${this.path}`, this.loginUser);
    }

    private loginUser = (req: Request, res: Response, next: NextFunction): void => {
        passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
            console.log(err, user, info);
            if (err || !user) {
                return next(new HttpException(401, 'Invalid credentials'));
            }

            req.login(user, { session: false }, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }

                const secret = process.env.JWT_SECRET;
                if (!secret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                const token = jwt.sign({ sub: user.id }, secret);
                return res.json({ user, token });
            });
        })(req, res, next);
    };
}

export default LoginController;