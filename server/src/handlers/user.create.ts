import { dbService } from "../services/user.service.ts";
import { jsonToXml } from "../soap/build.ts";

export const createUserHandler = async (payload: any) => {
   const newUser = await  dbService.user.createUserService(payload[0]) 
    const newUserXml = jsonToXml("createUserResponse", [newUser])

   return newUserXml
}




