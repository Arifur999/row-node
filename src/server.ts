import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { json } from "stream/consumers";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";
import "./routes/routes";
import { match } from "assert";



function findDynamicRoute(method:string,url:string){
    const methodMap =routes.get(method);
    if (!methodMap) return null

    for(const [routePath,handler]of methodMap.entries()){
        const routeParts=routePath.split('/');
        const urlParts=url.split('/')


        if (routeParts.length !== urlParts.length) continue;
        const params:any={};
        let matched=true;

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i]?.startsWith(':')) {
                params[routeParts[i]?.substring(1)!]=urlParts[i]
            }else if(routeParts[i]!== urlParts[i]){
                matched=false;
                break;

            }
            
        }

        if (matched) {
            return {handler,params};
        }
    }
    return null;
}




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
