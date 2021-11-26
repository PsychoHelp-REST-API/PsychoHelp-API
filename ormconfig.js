module.exports = {
  type: 'mysql',
  url: process.env.PSYCHOHELP_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [
    process.env.ENVIRONMENT == 'prod'
      ? '**/infrastructure/persistence/typeorm/entities/*.js'
      : 'dist/**/infrastructure/persistence/typeorm/entities/*.js',
  ],
  migrations: [
    process.env.ENVIRONMENT == 'prod'
      ? 'common/infrastructure/persistence/typeorm/migrations/*.js'
      : 'dist/common/infrastructure/persistence/typeorm/migrations/*.js',
  ],
  cli: {
    migrationsDir:
      process.env.ENVIRONMENT == 'prod'
        ? 'common/infrastructure/persistence/typeorm/migrations'
        : 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};
