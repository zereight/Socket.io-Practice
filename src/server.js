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

const io = SocketIO.listen(server);

io.on("connect", socket => {
  
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotify", {
      message,
      nickname: socket.nickname || "Anon"
    });
  });

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
