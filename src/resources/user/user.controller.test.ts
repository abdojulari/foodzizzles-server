import HttpException from '../../utils/exceptions/http.exception';
import UserController from "./user.controller";
import { Request, Response, NextFunction } from 'express';

describe('UserController', () => {

    // UserController initializes with correct path and router
    it('should initialize with correct path and router', () => {
        const userController = new UserController();
        expect(userController.path).toBe('/users');
        expect(userController.router).toBeDefined();
    });

    // UserController has a getAllUsers method that returns all users
    it('should return all users when getAllUsers is called', async () => {
        const userServiceMock = {
            findAll: jest.fn().mockResolvedValue([{ name: 'John Doe' }, { name: 'Jane Smith' }])
        };
        const userController = new UserController();
        (userController as any).userService = userServiceMock; // Access private field for testing
        const req: Request = { params: {} } as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next: NextFunction = jest.fn();

        await userController.getAllUsers(req, res, next);

        expect(userServiceMock.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ name: 'John Doe' }, { name: 'Jane Smith' }]);
        expect(next).not.toHaveBeenCalled();
    });

    // UserController has a getUser method that returns a single user by ID
    it('should return a single user by ID when getUser is called', async () => {
        const userServiceMock = {
            findById: jest.fn().mockResolvedValue({ name: 'John Doe' })
        };
        const userController = new UserController();
        (userController as any).userService = userServiceMock;
        const req: Request = { params: { id: '1' } } as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next: NextFunction = jest.fn();

        await userController.getUser(req, res, next);

        expect(userServiceMock.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' });
        expect(next).not.toHaveBeenCalled();
    });

    // UserController throws HttpException with status 400 and error message when there is an error creating a user
    it('should throw HttpException with status 400 and error message when there is an error creating a user', async () => {
        const userServiceMock = {
            create: jest.fn().mockRejectedValue(new Error('Failed to create user'))
        };
        const userController = new UserController();
        (userController as any).userService = userServiceMock;
        const req: Request = { body: { name: 'John Doe' } } as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next: NextFunction = jest.fn();

        await userController.createUser(req, res, next);

        expect(userServiceMock.create).toHaveBeenCalledWith({ name: 'John Doe' });
        expect(next).toHaveBeenCalledWith(new HttpException(400, 'Failed to create user'));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
