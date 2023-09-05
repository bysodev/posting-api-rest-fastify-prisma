import { hashPassword } from "../../utils/crypto";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput){
    const { password, ...rest} = input;
    const {salt, reuslt_crypto} = hashPassword(password);
    const user = await prisma.user.create( {
        data: {...rest, salt, password: reuslt_crypto}
    } )
    return user;
}

export async function findUserByEmail( email: string){
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function findUsers(){
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            Posts: true
        },
    })
}

export async function findPostsByUser(id: number){
    return prisma.post.findMany({
        select: {
            id: true,
            title: true, 
            content: true,
            createAt: true, 
            updateAt: true, 
            ownerId: true,
        },
        where: {
            ownerId: id
        }
        
    })
}

export async function findPostsByIdUser(iduser: number){
    return prisma.post.findMany({
        select: {
            id: true,
            title: true, 
            content: true,
            createAt: true, 
            updateAt: true, 
            ownerId: true,
        },
        where: {
            ownerId: iduser
        }
        
    })
}