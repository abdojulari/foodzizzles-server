import  RecipeController  from './recipe.controller';
import  HttpException  from '../../utils/exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';
import { RecipeService } from './recipe.service';

// Unit Test for RecipeController

describe('RecipeController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        
    });
    
    it('should create a new recipe with image successfully', async () => {
        // Arrange
        const req = {
            body: {
                name: 'Nigerian Jollof Rice',
                description: 'The best recipes on Nigerian Jollof Rice',
                duration: 30,
                date: '2015-12-03',
                cuisine: 'West African Cuisine',
                category: 'West Africa'
            },
            file: {
                path: 'uploads/recipes/image-12345.jpg'
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next = jest.fn();

        const recipeController = new RecipeController();

        // Act
        await recipeController.createRecipeWithImage(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            name: 'Nigerian Jollof Rice',
            description: 'The best recipes on Nigerian Jollof Rice',
            duration: 30,
            date: '2015-12-03',
            cuisine: 'West African Cuisine',
            category: 'West Africa',
            image: 'uploads/recipes/image-12345.jpg' // Include the 'image' property in the response
        });
    });

   


    // Should return 400 error if required fields are missing when creating a recipe
    it('should return 400 error if required fields are missing when creating a recipe', () => {
        // Arrange
        const req = {
            body: {
                name: 'Nigerian Jollof Rice',
                description: 'The best recipes on Nigerian Jollof Rice',
                duration: 30,
                date: '2015-12-03',
                cuisine: 'West African Cuisine'
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next = jest.fn();

        const recipeController = new RecipeController();

        // Act
        recipeController.createRecipeWithImage(req, res, next);

        // Assert
        expect(next).toHaveBeenCalledWith(new HttpException(400, 'Missing required fields'));
    });
});
