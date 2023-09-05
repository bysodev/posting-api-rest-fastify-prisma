import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const userCore = {
    name: z.string(),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email({
        message: 'Este email es incorrecto'
    })
};

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    })
});

const createUserResponseSchema = z.object({
    ...userCore
});

// LOGIN
const loginSchema = z.object({
    email: z.string( { 
        required_error: 'El email es requerido',
        invalid_type_error: 'Solo tiene que ser letras o caracteres'
    }).email()  ,
    password: z.string()
})

const loginResponseSchema = z.object({
    accessToken: z.string()
})

// POSTS
const responsePostsByUser =  z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().optional(),
    createAt: z.string(),
    updateAt: z.string(),
})

const responsePostByUserSchema = z.array( responsePostsByUser )


export type CreateUserInput = z.infer< typeof createUserSchema>;

export type LoginInput = z.infer< typeof loginSchema >;

export const {schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    responsePostByUserSchema
}, { $id: 'UserSchemas' })