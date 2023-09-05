import { FastifyRequest, FastifyReply } from 'fastify'
import { createUser, findUserByEmail, findUsers, findPostsByUser, findPostsByIdUser } from './user.service'
import { CreateUserInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/crypto';
import { server } from '../../app';

export async function registerUser(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply){
    const body = request.body;
    try {
        const user = await createUser(body);
        reply.code(201).send(user);
    } catch (error) {
        console.log(error);
        reply.code(500).send(error)
    }
}

export async function loginHandler(request: FastifyRequest<{
        Body: LoginInput
}>, reply: FastifyReply){
    const body = request.body;

    // find a user to email
    const user  = await findUserByEmail(body.email)

    if( !user ){
        return reply.code(401).send({
            message: "Invalid email or password"
        })
    }
    // Verify password
    const correctPassword = verifyPassword( { 
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password
    } );

    if( correctPassword ){
        const { password, salt, ...rest } = user
        // genereted access token
        return { accessToken: server.jwt.sign(rest) }
    }

    // respond
    return reply.code(401).send({
        message: "Invalid email or password"
    })

}

export async function getUsersHander(){
    return await findUsers();
}

export async function getPostsByUser( request: FastifyRequest ){
    return await findPostsByUser( request.user.id );
}

export async function getPostsByIdUser( request: FastifyRequest<{Params: {
    iduser: number
}}> ){
    const iduser = request.params.iduser ;
    return await findPostsByIdUser( iduser );
}