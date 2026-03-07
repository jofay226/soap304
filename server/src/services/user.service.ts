import prisma from "../db/prisma.ts"



export const dbService = {
    user: {
        listUsersService:  async () => {
            const users = await  prisma.user.findMany();
            return  users
        },
        createUserService:  async (payload) => {
            const newUser = await  prisma.user.create({
                data: {
                    name: payload.name,
                    age: payload.age,
                    email: payload.email
                }
            });
            return  newUser
        },
    },
    auth: {

    }, 
    post: {

    }
}

