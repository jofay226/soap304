import { dbService } from "../services/user.service.ts";
import { jsonToXml } from "../soap/build.ts";

export const listUserHandler = async () => {
    const users = await dbService.user.listUsersService()
    
    const usersXml = jsonToXml("listUsersResponse",users)

    return usersXml 
}
