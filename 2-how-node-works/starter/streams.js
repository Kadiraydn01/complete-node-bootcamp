const server = require("http").createServer();
const fs = require("fs");

server.on("request", (req, res) => {
  const readable = fs.createReadStream("yeni-file.txt", "utf-8");
  readable.pipe(res);
});
server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
