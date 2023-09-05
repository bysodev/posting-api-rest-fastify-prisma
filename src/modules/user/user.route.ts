import { FastifyInstance } from "fastify";
import { registerUser, loginHandler, getUsersHander, getPostsByUser, getPostsByIdUser } from "./user.controller";
import { $ref } from "./user.schema";

async function userRouter(server: FastifyInstance){ // El objeto necesario para crear las rutas y contorlar las solicitudes de estas rutas
    server.post('/', {
        schema: { // Lo importate es que nos ayuda a desinfectar de todo parametro extra o no deseado, por decir ingresaron un objeto con id, pero eso se supone uqe la base de datos lo autincremente por lo que zod nos ayuda a limpiar esos parametros que no se necesitan
            body: $ref('createUserSchema'), // Datos recibidos segun nuestro schema
            response: {
                201: $ref('createUserResponseSchema')
            }
        
        }
    } ,registerUser)

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                201: $ref('loginResponseSchema')
            }
        }
    }, loginHandler )

    server.get('/', {
        preHandler: server.authenticate
    }, getUsersHander);

    server.get('/posts', { // Es necesario la autenticación para buscar lo spost por el id
        preHandler: server.authenticate,
        schema: {
            response: {
                200: $ref('responsePostByUserSchema')
            }
        }
    }, getPostsByUser);

    server.get('/posts/:iduser', { 
        schema: {
            params: {
                iduser: {type: 'number'}
            },
            response: {
                200: $ref('responsePostByUserSchema')
            }
        }
    }, getPostsByIdUser);

}

export default userRouter;