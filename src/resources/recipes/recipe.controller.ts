import { Router, Request, Response, NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middlewares/validation.middleware';
import validate from './recipe.validation';
import { RecipeService } from './recipe.service';


class RecipeController implements Controller {
    public path = '/recipes';
    public router = Router();
    public recipeService = new RecipeService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * @swagger
     * components:
     *   schemas:
     *     RecipeInput:   
     *       type: object
     *       properties:
     *          name:
     *             type: string
     *             description: name of recipe
     *             example: Nigerian Jollof Rice
     *          description:
     *             type: string
     *             description: short description of recipe
     *             example: The best recipes on Nigerian Jollof Rice
     *          duration:
     *              type: integer
     *              description: read time of recipe
     *              example: 6 minute read
     *          category:
     *              type: string
     *              description: categorizing the recipes based on the continent or country
     *              example: West Africa recipes  
     *          cuisine:
     *              type: string
     *              description: cuisine recipes
     *              example: West Africa recipes
     *          date:
     *              type: string
     *              description: categorizing the recipes based on the continent or country
     *              example: 2015-03-25
     *          image:
     *              type: string
     *              format: binary
     *              description: the url featured image of the recipes
     *              example: (binary data)                
     */
    public initializeRoutes(): void { 

        /**
         * @swagger
         * /api/recipes:
         *   post:
         *     tags:
         *       - Recipes
         *     summary: Create a new recipe
         *     description: Endpoint to create a new recipe
         *     requestBody:
         *       required: true
         *       content:
         *         multipart/form-data:
         *           schema:
         *             $ref: '#/components/schemas/RecipeInput'
         *       examples:
         *          example-1:
         *              value:
         *                  name: Nigerian Jollof Rice
         *                  description: The best recipes on Nigerian Jollof Rice
         *                  duration: 30
         *                  date: 2015-12-03
         *                  cuisine: West African Cuisine
         *                  category: West Africa
         *                  image: (binary data)
         *     responses:
         *       200:
         *         description: A successful response
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RecipeInput'
         */
        this.router.post(
            `${this.path}`, 
            this.recipeService.upload.single('image'),
            this.createRecipeWithImage
        );

        /**
         * @swagger
         * /api/recipes:
         *   get:
         *     tags:
         *       - Recipes
         *     summary: Get all recipes
         *     description: Endpoint to retrieve all recipes
         *     responses:
         *       200:
         *         description: A successful response
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Recipe'
         */
        this.router.get(`${this.path}`, this.getAllRecipes);

        /**
         * @swagger
         * /api/recipes/{id}:
         *   get:
         *     tags:
         *       - Recipes
         *     summary: Get a recipe by ID
         *     description: Endpoint to retrieve a recipe by ID
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: Recipe ID
         *     responses:
         *       200:
         *         description: A successful response
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Recipe'
         */
        this.router.get(`${this.path}/:id`, this.getRecipe);

        /**
         * @swagger
         * /api/recipes/{id}:
         *   put:
         *     tags:
         *       - Recipes
         *     summary: Update a recipe by ID
         *     description: Endpoint to update a recipe by ID
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: Recipe ID
         *     requestBody:
         *       required: true
         *       content:
         *         multipart/form-data:
         *           schema:
         *             $ref: '#/components/schemas/RecipeInput'
         *     responses:
         *       200:
         *         description: A successful response
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RecipeInput'
         */
        this.router.put(
            `${this.path}/:id`, 
            this.recipeService.upload.single('image'),
            this.updateRecipeWithImage
        );

        /**
         * @swagger
         * /api/recipes/{id}:
         *   delete:
         *     tags:
         *       - Recipes
         *     summary: Delete a recipe by ID
         *     description: Endpoint to delete a recipe by ID
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: Recipe ID
         *     responses:
         *       200:
         *         description: A successful response
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 description:
         *                   type: string
         *                   example: successfully deleted recipe
         */
        this.router.delete(`${this.path}/:id`, this.deleteRecipe);

    }

    public getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const recipes = await this.recipeService.findAll();
            res.status(200).json(recipes);
        } catch (error) {
            next(error);
        }
    }


    public createRecipeWithImage = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name, description, duration, category, cuisine, date } = req.body;
            const recipe = await this.recipeService.createWithImage({
                name,
                description,
                duration,
                category,
                cuisine,
                date,
                image: req.file?.path
            });
            
            res.status(201).json(recipe );
        } catch (error: any) {
            next(new HttpException(400, (error as Error).message));
        }
    }

    public updateRecipeWithImage = async (req: any, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, description, duration, category, cuisine, date } = req.body;

            if (!name || !description || !duration || !category || !cuisine || !date) {
                throw new HttpException(400, 'Missing required fields');
            }

            const recipe = await this.recipeService.updateWithImage(req.params.id, {
                name,
                description,
                duration,
                category,
                cuisine,
                date,
                file: req.file, // Pass the file information to the service
            });

            res.status(200).json(recipe);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }

    public deleteRecipe = async (req: Request, res: Response, next: NextFunction): Promise< Response | void> => {
        try {
            const recipe = await this.recipeService.delete(Number(req.params.id));
            res.status(200).json(recipe);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }

    public getRecipe =  async (req: Request, res: Response, next: NextFunction): Promise< Response | void>  => {
        try {
            const recipe = await this.recipeService.findById(Number(req.params.id));
            res.status(200).json(recipe);
        } catch (error) {
            next(new HttpException(400, (error as Error).message));
        }
    }

}

export default  RecipeController