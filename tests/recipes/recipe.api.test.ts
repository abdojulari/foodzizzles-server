import request from 'supertest';
import App from '../../src/app';
import RecipeController from '../../src/resources/recipes/recipe.controller';

const app = new App(
  [
    new RecipeController(),
  ],
  Number(process.env.POSTGRES_PORT)
);

describe('RecipeController Endpoints', () => {
  
  it('should get all recipes', (done) => {
    request(app.app)
      .get('/api/recipes')
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);

        expect(response.body).toBeInstanceOf(Array);
        done();
      });
  }, 30000);

  it('should get a recipe by ID', (done) => {
    request(app.app)
      .get('/api/recipes/1')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }, 30000);

  it('should delete a recipe by ID', (done) => {
    request(app.app)
      .delete('/api/recipes/1')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }, 30000);
});
