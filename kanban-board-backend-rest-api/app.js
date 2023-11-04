const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();

const boardRoutes = require("./routes/board");
const listRoutes = require("./routes/list");
const cardRoutes = require("./routes/card");
const authRoutes = require("./routes/auth");

const bodyParser = require("body-parser");
const setHeaders = require("./middleware/headers");
const sendErrorResponse = require("./controllers/error");

app.use(bodyParser.json());
app.use(helmet());
app.use(setHeaders);

app.use("/auth", authRoutes);
app.use("/board", boardRoutes);
app.use("/list", listRoutes);
app.use("/card", cardRoutes);

app.use(sendErrorResponse);
mongoose.set('strictQuery', false);

mongoose
  .connect(
    `mongodb://localhost:27017/test`
  )
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log('server is runnig at 8080');
  })
  .catch((err) => console.log(err));
