import prisma from "../../utils/prisma";
import { CreateProductInput } from "./post.schema";

export async function createPost( data: CreateProductInput & {ownerId: number} ){
    return prisma.post.create( { data } )
}

export async function findPosts(){
    return prisma.post.findMany({
        select: {
            id: true,
            title: true, 
            content: true,
            createAt: true, 
            updateAt: true, 
            ownerId: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })
}

export async function findPostsPerosnal(id: number){
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