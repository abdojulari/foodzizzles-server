import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ 
            choices: ['development', 'test', 'production'] 
        }),
        PORT: port({ default: 3000}),
        DB_NAME: str(),
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        DB_HOST: str(),
    })
}

export default validateEnv;