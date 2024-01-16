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
            customCss: `
                .swagger-ui .topbar {
                    display: none;
                }
                .swagger-ui .information-container {
                    background-color: #238072; 
                    
                }
                .renderedMarkdown {
                    color: #fff;
                }
                .swagger-ui .opblock.opblock-get .opblock-summary {
                    border-color: transparent;
                }
                
                .swagger-ui .wrapper {
                    box-sizing: border-box;
                    margin: 0 auto;
                    max-width: 1460px;
                    padding: 20px;
                    width: 100%;
                }
                .swagger-ui .opblock.opblock-post, 
                .swagger-ui .opblock.opblock-get,
                .swagger-ui .opblock.opblock-put, 
                .swagger-ui .opblock.opblock-delete {
                    background: white;
                    border-color: white;
                }
                .swagger-ui .opblock {
                    border: 1px solid #000;
                    border-radius: 4px;
                    box-shadow: 0 0 3px rgba(0,0,0,.19);
                    margin: 0 0 15px;
                }
                .swagger-ui .opblock .opblock-summary {
                    align-items: center;
                    cursor: pointer;
                    display: flex;
                    
                }
                swagger-ui .opblock .opblock-summary-method {
                    background: #000;
                    color: #fff;
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    min-width: 80px;
                    padding: 8px 0;
                    text-align: center;
                    text-shadow: 0 1px 0 rgba(0,0,0,.1);
                }
            `,
            customSiteTitle: 'API Documentation'
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
