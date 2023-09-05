import { FastifyInstance } from "fastify";
import {$ref} from  './post.schema'
import { getPosts, registerPost, getPostsPersonal } from "./post.controller";


async function RouterPost(server: FastifyInstance){

    server.post( '/', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createPostSchema'),
            response: {
                201: $ref('responsePostSchema')
            }
        }
    }, registerPost )

    server.get( '/', {
        schema: {
            response: {
                200: $ref('responsePostsSchem')
            }
        }
    }, getPosts )

    server.get( '/personal', { // Necesita de la authenticación para poder buscar por
        preHandler: [server.authenticate],
        schema: {
            response: {
                200: $ref('responsePostsSchem')
            }
        }
    }, getPostsPersonal )
}

export default RouterPost
