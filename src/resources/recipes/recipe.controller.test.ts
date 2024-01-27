
import RecipeController from './recipe.controller';
import { Request, Response, NextFunction } from 'express';


describe('RecipeController', () => {
    
    // Should be able to get all recipes successfully
    it('should get all recipes successfully', async () => {
        // Arrange
        const req: Request = {} as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next: NextFunction = jest.fn();

        const recipeController = new RecipeController();
        recipeController.recipeService.findAll = jest.fn().mockResolvedValue([
            {
                name: 'Nigerian Jollof Rice',
                description: 'The best recipes on Nigerian Jollof Rice',
                duration: 30,
                category: 'West Africa',
                cuisine: 'West African Cuisine',
                date: '2015-12-03',
                image: 'uploads/recipes/image-12345.jpg'
            },
            {
                name: 'Ghanaian Jollof Rice',
                description: 'The best recipes on Ghanaian Jollof Rice',
                duration: 45,
                category: 'West Africa',
                cuisine: 'Ghanaian Cuisine',
                date: '2016-05-20',
                image: 'uploads/recipes/image-67890.jpg'
            }
        ]);

        // Act
        await recipeController.getAllRecipes(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                name: 'Nigerian Jollof Rice',
                description: 'The best recipes on Nigerian Jollof Rice',
                duration: 30,
                category: 'West Africa',
                cuisine: 'West African Cuisine',
                date: '2015-12-03',
                image: 'uploads/recipes/image-12345.jpg'
            },
            {
                name: 'Ghanaian Jollof Rice',
                description: 'The best recipes on Ghanaian Jollof Rice',
                duration: 45,
                category: 'West Africa',
                cuisine: 'Ghanaian Cuisine',
                date: '2016-05-20',
                image: 'uploads/recipes/image-67890.jpg'
            }
        ]);
    });

    // Should be able to get a recipe by ID successfully
    it('should get a recipe by ID successfully when a valid ID is provided', async () => {
        // Arrange
        const req: Request = {
            params: {
                id: '1'
            }
        } as any;
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        const next: NextFunction = jest.fn();


        const recipeController = new RecipeController();
        recipeController.recipeService.findById = jest.fn().mockResolvedValue({
            id: 1,
            name: 'Nigerian Jollof Rice',
            description: 'The best recipes on Nigerian Jollof Rice',
            duration: 30,
            category: 'West Africa',
            cuisine: 'West African Cuisine',
            date: '2015-12-03',
            image: 'uploads/recipes/image-12345.jpg'
        });


        // Act
        await recipeController.getRecipe(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: 'Nigerian Jollof Rice',
            description: 'The best recipes on Nigerian Jollof Rice',
            duration: 30,
            category: 'West Africa',
            cuisine: 'West African Cuisine',
            date: '2015-12-03',
            image: 'uploads/recipes/image-12345.jpg'
        });
    });
});
