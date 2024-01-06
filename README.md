# shopping-cart-server
A shopping cart system is a crucial component of e-commerce websites and applications. It handles various functionalities related to user authentication and authorization, managing the cart, inventory management, user profiles, payment processing, notifications, and product recommendations.

# How to configure
Run the following command
```bash
yarn install
```
To run the application, run the following command
```bash
yarn run start
```

## Setting up database configuration
Create a Sequelize migration script that checks if the database exists and creates it if necessary. You can use the sequelize.query method to run raw SQL queries. Create a new migration file using the Sequelize CLI

```bash
npx sequelize-cli migration:generate --name create-database
```
To run the migration
### Run Migrations
Run the migrations to apply the changes to the database
```bash
npx sequelize-cli db:migrate
```

### Run Seed Tests

To generate a seed, run the seed
```bash
npx sequelize-cli seed:generate --name demo-user  
```
Note the `demo-user` parameter is a name of the seed e.g demo-cart etc 

As a result of using .env variables, default configuration i.e config.json isn't used.
It needs to be specified as follows;
```bash
npx sequelize-cli db:seed:all --config ./config/config.js --env test 
```
add the `--debug` to debug the seeder