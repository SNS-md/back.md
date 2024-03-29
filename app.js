require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");

app.set("port", process.env.PORT || 8000);

sequelize.sync({ force: false }).then(() => {
  console.log("database connection success");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static(__dirname+'/front'));
app.use("/api/v1/posts", postsRouter);
app.get("*", (req, res) => {
  res.sendFile(__dirname+ '/front/index.html');
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 대기 중");
});
