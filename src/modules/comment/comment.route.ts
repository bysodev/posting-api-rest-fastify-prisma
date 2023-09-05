import { FastifyInstance } from "fastify";
import { $ref } from "./comment.schema";
import { registerComment, getComments, getCommentsPrivate } from "./comment.controller";



async function CommentRouter( server: FastifyInstance ){
    server.post('/', {
        preHandler: server.authenticate,
        schema: {
            body: $ref('createComment'),
            response: {
                201: $ref('responseComment')
            }
        }
    }, registerComment)

    server.get('/', {
        schema: {
            response: {
                200: $ref('responseComments')
            }
        }
    }, getComments)

    server.get('/personal', {
        preHandler: server.authenticate,
        schema: {
            response: {
                200: $ref('responseComments')
            }
        }
    }, getCommentsPrivate)

}

export default CommentRouter;