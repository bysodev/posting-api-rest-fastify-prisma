import {buildJsonSchemas} from 'fastify-zod'
import { z } from 'zod'

const corePost = {
    title: z.string(),
    content: z.string().optional(),
}

const postGenerated = {
    id: z.number(),
    createAt: z.string(),
    updateAt: z.string(),
    ownerId: z.number(),
    owner: z.object({
        id: z.number(),
        name: z.string()
    })
}

const createPostSchema = z.object({
    ...corePost,
})

const responsePostSchema = z.object({
    ...corePost,
    ...postGenerated,
})

const responsePostsSchem = z.array( responsePostSchema );

export type CreateProductInput = z.infer< typeof createPostSchema >

export const { schemas: postSchemas, $ref } = buildJsonSchemas({
    createPostSchema,
    responsePostSchema,
    responsePostsSchem
}, { $id: 'PostSchemas' })