export function registerChatSocket(socket) {
  socket.on("message", (message) => {
    console.log("Message received:", message);
    socket.emit("message", {
      ...message,
      from: "server",
      timestamp: new Date().toISOString(),
    });
  });
}
