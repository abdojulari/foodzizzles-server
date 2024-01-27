import { Recipe } from "./recipe.model";

import { sequelize } from "../../databases/database";

describe('Recipe Model', () => {
  beforeAll(async () => {
    // Recreate DB schema  
    await Recipe.sync({ force: true }); 
    
  });

  beforeEach(async () => {
      // Empty the table after each test
      await Recipe.destroy({ truncate: true }); // 
  });

  it('should create recipe', async () => {
  
    const user = await Recipe.create({
      id: 1,
      name: 'Rice',
      image: 'http://',
      description: 'something',
      duration: 2,
      cuisine: 'West African',
      category: 'African',
      date: new Date('2022-01-01').toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(user.getDataValue('name')).toEqual('Rice');
 
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });
});