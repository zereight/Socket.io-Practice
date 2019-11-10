import express from "express";
import path from "path";
import SocketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("home");
});

const server = app.listen(PORT, () => {
  console.log("✅ Listening!!");
});

// ws:/ /localhost and http://localhost run on the same server but they are different ways of handling connections.
const io = SocketIO.listen(server); // websocket이랑, http는 다른 프로토콜인데 같은 port에서 동작하도록 해줌(즉, 같은 서버)
// io변수가 있는 이유는 모든 이벤트를 io가 알아야하기 때문.
let sockets = [];
io.on("connect", socket => {
  // localhost:4000에서 pug에 스크립트 추가하고 console열고 io("/") 하면 프로트엔드랑 연결됨
  console.log("Somebody connected!");
  sockets.push(socket.id);
  //   socket.emit("hello"); // socket이 emit하면 다른 socket은 on으로 listen한다.
  socket.broadcast.emit("hello"); // 현재 통신하고 있는 socket이외의 모든 socket이 알게한다.
});

setInterval(() => {
  console.log(sockets);
}, 1000);
