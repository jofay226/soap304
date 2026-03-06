import { listUsersService } from "../services/user.service.ts";
import { jsonToXml } from "../soap/build.ts";

export const listUserHandler = async () => {
    const users = await listUsersService()
    
    const usersXml = jsonToXml("listUsersResponse",users)

    return usersXml 
}
