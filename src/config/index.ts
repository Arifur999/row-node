import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})


const config = {
  env: process.env.NODE_ENV || "development",         // keep as string
  port: Number(process.env.PORT) || 5000,             // convert to number + default
};




// const config ={
// env : process.env.NODE_ENV ? Number(process.env.NODE_ENV) : 5000,
// port: process.env.PORT,



// }
export default config