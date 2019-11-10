import express from "express";
import path from "path";
import SocketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log("✅ Listening!!");
});
