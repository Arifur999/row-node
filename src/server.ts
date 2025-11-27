import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { json } from "stream/consumers";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";
import "./routes/routes";
import { match } from "assert";
import findDynamicRoute from "./helpers/dynamicRoutes";



const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("start server......");

    const method=req.method?.toUpperCase() || "";
    const path=req.url || "";
    const methodMap=routes.get(method);
    const handler: RouteHandler | undefined=methodMap?.get(path)

// const methodMap=routes.get()

if (handler) {
    handler(req,res);
}
else if  (findDynamicRoute(method,path)){
const match =findDynamicRoute(method,path);
(req as any).params=match?.params;
match?.handler(req,res);
}

else{
    res.writeHead(404,{"content-type":"application/json"});
    res.end(
        JSON.stringify({
            success:false,
            message:"Route not found!!!",
            path,

        })
    )
}

//root rout

    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "hello from node js with typescript....",
    //       path: req.url,
    //     })
    //   );
    // }




// if (req.url=='/api' && req.method=="GET") {
//        res.writeHead(200, { "content-type": "application/json" });
//       res.end(
//         JSON.stringify({
//           message: "typescript boom boom....",
//           path: req.url,
//         })
//       );


// }


// if (req.url=='/api/user' && req.method=="POST") {
    // const user ={
    //     id:1,
    //     name:"alice"
    // };



    //        res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify(user)
    //   );



    // let body='';
//     req.on('data',chunk=>{
// body+=chunk.toString();
//     });
// req.on("end",()=>{
//   try {
//       const parsBody=JSON.parse(body);
//     console.log(body);
//     res.end(body)
    
//   } catch (error:any) {
//     console.log(error?.message);
//   }
// })


// }




  }
);

server.listen(config.port, () => {
  console.log(`server is running ${config.port}`);
});
