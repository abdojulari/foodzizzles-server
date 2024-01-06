import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import UserController from './resources/user/user.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

validateEnv();
const app = new App([new UserController], Number(process.env.PORT));
// swagger 
app.swagger();

// app listeners
app.listen();