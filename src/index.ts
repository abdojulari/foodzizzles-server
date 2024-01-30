import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import UserController from './resources/user/user.controller';
import LoginController from './resources/login/login.controller';
import RecipeController from './resources/recipes/recipe.controller';


validateEnv();
const app = new App(
    [
        new LoginController,
        new UserController,
        new RecipeController
    ],
    Number(process.env.POSTGRES_PORT));
// swagger 
app.swagger();

// app listeners
app.listen();