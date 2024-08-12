import { renderNotification } from "../view/dashboardView";

let ws;

export function initSocket(userId, username) {
  let host = `ws://127.0.0.1:8080/?userId=${userId}&username=${username}`;
  ws = new WebSocket(host);

  ws.onopen = function (e) {
    console.log(
      `Client id: ${userId} name: ${username} is connected to socket!!!`
    );
  };

  ws.onclose = function (e) {
    console.log(`Client id:${userId} name: ${username} is disconnected!!!`);
  };

  ws.onmessage = function (e) {
    const data = JSON.parse(e.data);
    renderNotification(data);
  };
}

export function sendNotification(obj) {
  ws.send(JSON.stringify(obj));
}
