// 
import { FastifyRequest } from 'fastify'
import { CreateProductInput } from './post.schema'
import { createPost, findPosts, findPostsPerosnal } from './post.service';
import { FastifyReply } from 'fastify/types/reply';

export async function registerPost( request: FastifyRequest<{
    Body: CreateProductInput;
}>){
    // console.log(request.user)

    const product = await createPost({
        ...request.body,
        ownerId: request.user.id,
    });

    // console.log(product)

    // reply.code(201).send(product)
    return product;
}

export async function getPosts( request: FastifyRequest, reply: FastifyReply){
    const posts = await findPosts();
    return posts;
}

export async function getPostsPersonal( request: FastifyRequest, reply: FastifyReply){
    const posts = await findPostsPerosnal(request.user.id);
    return posts;
}