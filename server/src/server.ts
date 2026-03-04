import http from "http";
import app from "./app.ts";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {  
    console.log(process.env.DATABASE_URL);
      
    console.log(`${process.env.PORT} ==>> comes from docker`);
    console.log(`server is running on port ${PORT}🚀🚀`);
})
