const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Version 1 - GitOps Demo");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});