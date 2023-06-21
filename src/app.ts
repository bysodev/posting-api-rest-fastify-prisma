import Fastify from "fastify";
import userRouter from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const server = Fastify()

server.get('/healthcheck', async function(request, response){
    return {status: "OK"}
})

async function main(){
    // Implementando todos lso esquemas a nivel de rutas de la aplicación
    for( const schema of userSchemas ){
        server.addSchema(schema); // Esto apra que en las rutas como segundo parametro se pueda enviar objetos aplciando schemas y no solo un body
    }
    // De esta forma integramos plugins, middleware
    server.register( userRouter, { prefix: 'api/user' } ) // Como es para rutas, le damos un prefijo para etiquetar todos los endpoints

    try{
        await server.listen( {port: 3001, host: '127.0.0.1'} );
        console.log('Server and Running')
    }catch(e){
        console.log(e)
        process.exit()
    }
}

main()