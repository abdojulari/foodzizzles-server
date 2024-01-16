# shopping-cart-server
A shopping cart system is a crucial component of e-commerce websites and applications. It handles various functionalities related to user authentication and authorization, managing the cart, inventory management, user profiles, payment processing, notifications, and product recommendations.

# How to configure
Run the following command
```bash
yarn install
```
To run the application, run the following command
```bash
yarn run dev
```

## Setting up database configuration
Create a Sequelize migration script that checks if the database exists and creates it if necessary. You can use the sequelize.query method to run raw SQL queries. Create a new migration file using the Sequelize CLI


### Create Model
Create a new model file using the Sequelize CLI. Note this would generate a new migration file as well
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### Create Migration 
Create a new migration file using the Sequelize CLI if the model is manually created
```bash
npx sequelize-cli migration:generate --name create-database
```
To run the migration
### Run Migrations
Run the migrations to apply the changes to the database
```bash
npx sequelize-cli db:migrate
```
### Undo Migrations
You can undo the migrations
```bash
npx sequelize-cli db:migrate:undo
```
or 

```bash
npx sequelize-cli db:migrate:undo:all --to 20230909021932-create-database.js
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

# Visit the Site 
You can visit the site at http://localhost:3000/api-docs/

# SQL 

## Truncate table with relation 

If you want to manually truncate the table and there's a relation between the tables e.g recipes and "AdditionalDetails", you can use the following query
```sql 
TRUNCATE TABLE recipes, "AdditionalDetails";
```
