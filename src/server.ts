import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { json } from "stream/consumers";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("start server......");

//root rout

    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello from node js with typescript....",
          path: req.url,
        })
      );
    }




if (req.url=='/api' && req.method=="GET") {
       res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "typescript boom boom....",
          path: req.url,
        })
      );


}


if (req.url=='/api/user' && req.method=="POST") {
    // const user ={
    //     id:1,
    //     name:"alice"
    // };



    //        res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify(user)
    //   );



    let body='';
    req.on('data',chunk=>{
body+=chunk.toString();
    });
req.on("end",()=>{
  try {
      const parsBody=JSON.parse(body);
    console.log(body);
    res.end(body)
    
  } catch (error:any) {
    console.log(error?.message);
  }
})


}




  }
);

server.listen(config.port, () => {
  console.log(`server is running ${config.port}`);
});
