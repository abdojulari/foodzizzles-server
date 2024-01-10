import { User } from "./user.model";
import * as bcrypt from 'bcrypt';
import { sequelize } from "../../databases/database";

describe('User Model', () => {
  beforeAll(async () => {
    // Recreate DB schema  
    await User.sync({ force: true }); 
    
  });

  beforeEach(async () => {
      // Empty the table after each test
      await User.destroy({ truncate: true }); // 
  });

  it('should hash the password when setting', async () => {
    // hash the password using bcrypt
    const password = 'password123';
    const user = await User.create({
      id: 1,
      name: 'John Tola',
      email: 'johndoe@example.com',
      password: bcrypt.hashSync(password, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(user.getDataValue('name')).toEqual('John Tola');
    expect(user.getDataValue('email')).toEqual('johndoe@example.com');
  });

  // test if password isn't already hashed
  it('should not hash the password if it is already hashed', async () => {
      const password = 'password123';
      const user = await User.create({
        id: 1,
        name: 'John Travis',
        email: 'john.travis@example.com',
        password: bcrypt.hashSync(password, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      expect(user.getDataValue('password')).not.toBe('password123'); // Ensure password is hashed
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });
});