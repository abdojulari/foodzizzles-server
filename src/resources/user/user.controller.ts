import { Router, Request, Response, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middlewares/validation.middleware';
import validate from './user.validation';
import { UserService } from './user.service';
import jwt from 'jsonwebtoken';


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();
    
    constructor() {
        this.initializeRoutes();
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *     users:   
     *       type: object
     *       properties:
     *          name:
     *             type: string
     *             description: User name
     *             example: John Doe
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
         * /api/users/{id}:
         *  get:
         *      tags:
         *          - Users
         *      summary: Retrieve a user by ID
         *      description: Retrieve a user by ID
         *      parameters:
         *          - in: path
         *            name: id
         *            schema:
         *              type: integer
         *            required: true
         *            description: user id
         *      responses:
         *         200:
         *            description: A single user object
         *            content:
         *              applcation/json:
         *                 schema:
         *                   type: object
         *                   properties:
         *                      description:
         *                          type: string
         *                          example: successfully retrieved user
         *                      data:
         *                          $ref: '#/components/schemas/users'
         * 
         */
        this.router.get(`${this.path}/:id`, this.getUser);

        /**
         * @swagger
         * /api/users:
         *  get:
         *      tags:
         *          - Users
         *      summary: Retrieve a list of users
         *      description: Retrieve a list of users
         *      responses:
         *         200:
         *            description: A list of users.
         *            content:
         *              applcation/json:
         *                 schema:
         *                   type: object
         *                   properties:
         *                      description:
         *                          type: string
         *                          example: successfully retrieved users
         *                      data:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/users'
         * 
         */
        this.router.get(`${this.path}`, this.getAllUsers);

        /**
         * @swagger
         * /api/users:
         *  post:
         *    tags:
         *        - Users
         *    description: Create a new user API
         *    summary: Create users data
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *         schema:
         *           type: object
         *           properties:
         *               name:
         *                 type: string
         *                 description: User name
         *                 example: John Doe
         *               email:
         *                 type: string
         *                 description: User email
         *                 example: joe@example.com
         *               password:
         *                 type: string
         *                 description: User password
         *                 example: 12345
         *    responses:
         *      200:
         *          description: Successfully created user
         *          content:
         *             application/json:
         *                schema:
         *                 type: object
         *                 properties:
         *                  description:
         *                    type: string
         *                    example: Successfully created user
         */
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.createUser);
        /** 
        * @swagger
        * /api/users/{id}:
        *  put:
        *    tags:
        *        - Users
        *    description: Update a user API
        *    summary: Update users data
        *    parameters:
        *          - in: path
        *            name: id
        *            schema:
        *              type: integer
        *            required: true
        *            description: user id
        *    requestBody:
        *      required: true
        *      content:
        *        application/json:
        *         schema:
        *           type: object
        *           properties:
        *               name:
        *                 type: string
        *                 description: User name
        *                 example: John Doe
        *               email:
        *                 type: string
        *                 description: User email
        *                 example: john@example.com
        *               password:
        *                 type: string
        *                 description: User password
        *                 example: 1234
        */
        this.router.put(`${this.path}/:id`, validationMiddleware, this.updateUser);
        /**
         * @swagger
         * /api/users/{id}:
         *    delete:
         *       tags:
         *         - Users
         *       summary: Delete a user by ID
         *       description: Delete a user by ID
         *       parameters:
         *         - name: id
         *           in: path
         *           required: true
         *           description: user id
         *           schema:
         *              type: integer
         *              format: int64
         *       responses:
         *          200:
         *             description: Successfully deleted user
         *             content:
         *                application/json:
         *                  schema:
         *                      type: string
         *                      properties:
         *                          description:
         *                              type: string
         *                              example: Successfully deleted user
         * 
         */
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

   
    private getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    // private createUser = async (req: Request, res: Response, next: NextFunction): Promise< Response | void> => {
    //     try {

    //         const user = await this.userService.create(req.body);
    //         // try to create a new user with the same route as createUser using passportJS LocalStrategy and JWT token

    //         res.status(201).json(user);
    //     } catch (error) {
    //         next(new HttpException(400, (error as Error).message));
    //     }
    // }

    private createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const user = await this.userService.create(req.body);
    
            // Authenticate the user after creation
            req.login(user, { session: false }, async (err) => {
                if (err) {
                    return next(err);
                }
    
                const secret = process.env.JWT_SECRET;
                if (!secret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                // Generate JWT token
                const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, secret); 
                
                // Send the token in the response
                res.status(201).json({ user, token });
            });
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }
    
    private updateUser = async (req: Request, res: Response, next: NextFunction): Promise< Response | void> => {
        try {
            const user = await this.userService.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }

    private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise< Response | void> => {
        try {
            const user = await this.userService.delete(Number(req.params.id));
            res.status(200).json(user);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }

    private getUser =  async (req: Request, res: Response, next: NextFunction): Promise< Response | void>  => {
        try {
            const user = await this.userService.findById(Number(req.params.id));
            res.status(200).json(user);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }


}
export default UserController;