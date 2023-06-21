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