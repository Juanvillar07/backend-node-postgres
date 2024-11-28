const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

require('./utils/auth');

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("SERVIDOR CORRIENDO EN => " + port);
});

