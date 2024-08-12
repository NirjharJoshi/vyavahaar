const http = require("http");
const url = require("url");
const { WebSocketServer, WebSocket } = require("ws");

const host = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://127.0.0.1:1234",
    "Access-Control-Allow-Origin": "*",
  });

  res.end(JSON.stringify({ status: "base server is running" }));
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function (req, socket, head) {
  const query = url.parse(req.url, true).query;
  if (!query || !query.userId || !query.username) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, (ws) => {
    ws.userId = query.userId;
    ws.username = query.username;
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req) => {
  console.log(
    `💪 Client having userId: ${ws.userId} name: ${ws.username} is connected!!! 💪`
  );
  ws.on("close", () =>
    console.log(
      `⛔ Client having userId: ${ws.userId} name: ${ws.username} is connected!!! ⛔`
    )
  );

  let message;
  ws.on("message", (data) => {
    message = JSON.parse(data.toString("utf-8"));
    const clientMessage = {
      fromId: ws.userId,
      fromUsername: ws.username,
      toId: message.userId,
      toUsername: message.username,
      toPostId: message.postId,
      interaction: message.interaction,
      likeCount: message.likeCount,
      comment: message.comment,
    };
    console.log(clientMessage);
    wss.clients.forEach((client) => {
      if (
        client.userId === clientMessage.toId &&
        client.readyState === WebSocket.OPEN
      ) {
        client.send(JSON.stringify(clientMessage));
      }
    });
  });
});

server.listen(port, host, () => {
  console.log(`👍 Server is running at ${host}:${port} 👍`);
});
