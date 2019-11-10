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

const server = app.listen(PORT, () => {
  console.log("✅ Listening!!");
});

// ws:/ /localhost and http://localhost run on the same server but they are different ways of handling connections.
const io = SocketIO(server); // websocket이랑, http는 다른 프로토콜인데 같은 port에서 동작하도록 해줌(즉, 같은 서버)