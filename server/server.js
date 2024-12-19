import http from "http";
import index from "./index.js"
const port = process.env.PORT || 3000
const server = http.createServer(index);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});