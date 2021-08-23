const sequelizeClient = require('./sequelize-client');

module.exports = function (app) {
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelizeClient);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelizeClient;
    console.log(models)
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelizeClient
      .sync({ alter: true })
      .then(() => console.log('DB connected'))
      .catch((err) => console.log(err));

    return result;
  };
};
