import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({ 
            choices: ['development', 'test', 'production'] 
        }),
        POSTGRES_PORT: port({ default: 3000}),
        POSTGRES_DB: str(),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_HOST: str(),
    })
}

export default validateEnv;