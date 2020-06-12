const faker = require("faker");
const jsonserver = require("json-server");
const middlewares = jsonserver.defaults();

const server = jsonserver.create();
server.use(jsonserver.bodyParser)
server.use(middlewares)



server.post("/list", (request, response) => {
  
});

server.listen(5000, ()=>{
  console.log("Mock API Server is Listening")
})