import prisma from "../../utils/prisma";
import { CreateCommentInput } from "./comment.schema";


export async function createComment( data: CreateCommentInput & {ownerId: number}  ){
    return prisma.comment.create({data})
}


export async function findComments(){
    return prisma.comment.findMany({
        select: {
            id: true,
            content: true,
            postId: true,
            createAt: true,
            updateAt: true,
            owner: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}

export async function findCommentsUser( ownerId: number ){
    return prisma.comment.findMany({
        where: {
            ownerId
        }
    })
}