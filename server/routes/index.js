const apiRoutes = require("./api-routes");

const constructorMethod = (app) => {
  app.use("/apiRoutes", apiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Path Not Found" });
  });
};

module.exports = constructorMethod;
