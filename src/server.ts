import http, {IncomingMessage, Server, ServerResponse} from "http"

const server : Server=http.createServer((req:IncomingMessage,res:ServerResponse)=>{

console.log("start server......");
if (req.url=='/' && req.method== 'GET') {
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify(
        {
            message:"hello from node js with typescript....",
            path:req.url,
        }
    ));


}


})



server.listen(5000,()=>{
    console.log(`server is running ${5000}`);
});


