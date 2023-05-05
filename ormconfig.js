export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'movies',
  synchronize: true,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "libs/typeorm/src/lib/entities/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "libs/typeorm/src/lib/entities",
    "migrationsDir": "migrations",
  }
};
