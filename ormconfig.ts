module.exports = {
  type: 'mysql',
  url: process.env.PSYCHOHELP_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  cli: {
    migrationsDir: 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};