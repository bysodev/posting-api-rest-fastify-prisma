import Fastify from "fastify";
import userRouter from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { FastifyRequest, FastifyReply } from 'fastify'
import fjwt, {JWT} from "@fastify/jwt"
import RouterPost from "./modules/post/post.reoute";
import { postSchemas } from "./modules/post/post.schema";
import CommentRouter from "./modules/comment/comment.route";
import { commentSchema } from "./modules/comment/comment.schema";

export const server = Fastify()

declare module "fastify" {
    interface FastifyRequest{
        jwt: JWT
    }

    export interface FastifyInstance{
        authenticate: any
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
      user: {
        id: number;
        email: string;
        name: string;
      };
    }
  }

server.register(fjwt, {
    secret: 'supersecret',
    sign: {
        expiresIn: '5m' // Tiempo en el que expira el token
    }
})

server.decorate("authenticate", async function(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
})

server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

server.get('/healthcheck', async function(request, response){
    return {status: "OK"}
})

async function main(){
    // Implementando todos lso esquemas a nivel de rutas de la aplicación
    for( const schema of  [ ...userSchemas, ...postSchemas, ...commentSchema] ){
        server.addSchema( schema ); // Esto apra que en las rutas como segundo parametro se pueda enviar objetos aplciando schemas y no solo un body
    }
    // De esta forma integramos plugins, middleware
    server.register( userRouter, { prefix: 'api/user' } ) // Como es para rutas, le damos un prefijo para etiquetar todos los endpoints
    server.register( RouterPost, { prefix: 'api/post' } )
    server.register( CommentRouter, { prefix: 'api/comment' } )
    try{
        await server.listen( {port: 3001, host: '127.0.0.1'} );
        console.log('Server and Running')
    }catch(e){
        console.log(e)
        process.exit()
    }
}

main()