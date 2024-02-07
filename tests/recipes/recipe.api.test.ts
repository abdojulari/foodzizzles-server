import request from 'supertest';
import App  from '../../src/app';
import RecipeController from '../../src/resources/recipes/recipe.controller';

const app = new App(
  [
    new RecipeController(),
  ],
  Number(process.env.POSTGRES_PORT)
);
describe('RecipeController Endpoints', () => {
  
  it('should get all recipes', async () => {
    const response = await request(app.app).get('/api/recipes');
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a recipe by ID', async () => {
    const response = await request(app.app).get('/api/recipes/1');
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should delete a recipe by ID', async () => {
    const response = await request(app.app).delete('/api/recipes/1');
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
