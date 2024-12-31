import http from "http";
import index from "./index.js"
import { initializeSocket } from "./socket.js";
const port = process.env.PORT || 3000
const server = http.createServer(index);

initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});