import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { CreateCommentInput } from "./comment.schema";
import { createComment, findComments, findCommentsUser } from "./comment.service";


export async function registerComment( request: FastifyRequest<{
    Body: CreateCommentInput
}>, reply: FastifyReply  ) {
    const comment = await createComment( {
        ...request.body,
        ownerId: request.user.id,
    } )
    return comment;
}

export async function getComments(){
    const comments = await findComments();
    return comments;
}

export async function getCommentsPrivate( request: FastifyRequest ){
    const comments = await findCommentsUser( request.user.id );
    return comments;
}