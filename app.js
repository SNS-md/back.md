require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");

app.set("port", process.env.PORT || 8000);

sequelize.sync({ force: true }).then(() => {
  console.log("database connection success");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/posts", postsRouter);
app.get("/", (req, res) => {
  res.status(200).send("sns.md");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 대기 중");
});
