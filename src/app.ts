import express, { Application, Request, Response, NextFunction} from 'express';
import compression  from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connection } from '../databases/connection';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import errorMiddleware from './middlewares/error.middleware';
import Controller from 'utils/interfaces/controller.interface';

// import passport from passport-config
import passport from '../config/passport-config';

class App {
    public app: Application;
    public port: number;
    
    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeDatabaseConnection();
        this.initializeController(controllers);
        this.errorhandler();
    }

    private initializeMiddleware(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(passport.initialize());
    }

    private initializeDatabaseConnection(): void {
        connection();
    }

    private errorhandler(): void {
        this.app.use(errorMiddleware);
    }

    private initializeController(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public swagger(): void {
        const options = {
            customCss: '.swagger-ui .topbar { display: none }'
        };
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options, { explorer: true }));
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
    }
}

export default App;
