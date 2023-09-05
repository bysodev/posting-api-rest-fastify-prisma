import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const coreComment = {
    content: z.string(),
    likes: z.number().optional(),
    img: z.string().optional(),
    postId: z.number(),
}

const commentGenerated = {
    id: z.number(),
    createAt: z.string(),
    updateAt: z.string(),
    owner: z.object({
        id: z.number(),
        name: z.string()
    }).optional(),
}

const createComment = z.object({
    ...coreComment
})

const responseComment = z.object({
    ...coreComment,
    ...commentGenerated,
})

const responseComments = z.array( responseComment )

export type CreateCommentInput = z.infer< typeof createComment >;

export const {schemas: commentSchema, $ref} = buildJsonSchemas({
    createComment, 
    responseComment,
    responseComments
}, { $id: 'CommentSchema' })