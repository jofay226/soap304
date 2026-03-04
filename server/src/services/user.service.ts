import prisma from "../db/prisma.ts"

export const listUsersService = async () => {
    const users = await  prisma.user.findMany();
    return  users
}

