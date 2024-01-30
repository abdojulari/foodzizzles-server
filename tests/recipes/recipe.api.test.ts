import request from 'supertest';
import App  from '../../src/app';
import RecipeController from '../../src/resources/recipes/recipe.controller';
import { Recipe } from '../../models/recipes/recipe.model';

const app = new App(
  [
    new RecipeController(),
  ],
  Number(process.env.POSTGRES_PORT)
);
describe('RecipeController Endpoints', () => {
  
  it('should get all recipes', async () => {
    const response = await request(app.app).get('/api/recipes');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

  });

  it('should get a recipe by ID', async () => {
    const response = await request(app.app).get('/api/recipes/1');
    expect(response.status).toBe(200);
  });

  it('should update a recipe by ID', async () => {
    const response = await request(app.app)
      .put('/api/recipes/1')
      .field('name', 'Updated Recipe Name')
      .field('description', 'Updated Recipe Description')
      .field('duration', 4)
      .field('date', '2022-01-28')
      .field('cuisine', 'Updated Cuisine')
      .field('category', 'Updated Category')
      .attach('image', 'uploads/recipes/test-1706314383727.png');

    expect(response.status).toBe(200);
  }, 30000);

  it('should delete a recipe by ID', async () => {
    const response = await request(app.app).delete('/api/recipes/1');
    expect(response.status).toBe(200);
  });
});
