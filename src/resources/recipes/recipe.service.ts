import { Recipe, RecipeAttributes } from '../../../models/recipes/recipe.model';
import  multer  from 'multer';
import path from 'path';

export class RecipeService {
    private recipe = Recipe;

    private storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/recipes');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname
                + '-' + Date.now()
                + path.extname(file.originalname));
        }
    });

    constructor() {
        // Initialize multer here
        this.upload = multer({ storage: this.storage });
    }

    public upload = multer({ storage: this.storage });

    public async createWithImage(data: any): Promise<Recipe> {
         const { name, description, duration, category, cuisine, date, image } = data;
        if (!name || !description || !duration || !category || !cuisine || !date) {
            throw new Error('Missing required fields');
        }

        const existingRecipe = await this.findByName(name);
        if (existingRecipe) {
            throw new Error('Recipe already exists');
        }
        const recipeData = { name, description, duration, category, cuisine, date, image };
  
        const recipe = await this.recipe.create(recipeData as RecipeAttributes);
        
        return recipe;
    }

    public async updateWithImage(id: string, data: any): Promise<[number, Recipe[]]> {
        const { name, description, duration, category, cuisine, date } = data;
        const image = data.file ? data.file.filename : undefined;

        const [affectedCount, updatedRecipes] = await Recipe.update(
            { name, description, duration, category, cuisine, date, image },
            {
                where: { id },
                returning: true,
            }
        );

        return [affectedCount, updatedRecipes];
    }
    
    public async findByName(name: string): Promise<Recipe | null> {
        return await Recipe.findOne({ where: { name: name } });
    }
    
    public async findById(id: number): Promise<Recipe | null> {
        return await Recipe.findByPk(id);
    }

    public async findAll(): Promise<Recipe[]> {
        return await Recipe.findAll();
    }

    public async delete(id: number): Promise<number> {
        return await Recipe.destroy({
            where: { id: id },
        });
    }
}