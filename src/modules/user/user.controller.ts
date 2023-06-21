import { FastifyRequest, FastifyReply } from 'fastify'
import { createUser } from './user.service'
import { CreateUserInput } from './user.schema';

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