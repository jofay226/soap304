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
                    name: payload.name[0],
                    age: +payload.age[0],
                    email: payload.email[0]
                }
            });
            return  newUser
        },
        updateUserService:  async (payload) => {
            const data  = {
                payload.name[0] ?  payload.name[0]: null,
                payload.email[0] ?  payload.email[0]: null,
                payload.age[0] ?  payload.age[0]: null,
            }

            const newUser = await  prisma.user.update({
                where: {id: payload.id[0]},
                data
            });
            return  newUser
        },
    },
    auth: {

    }, 
    post: {

    }
}

