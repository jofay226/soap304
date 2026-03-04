import { listUsersService } from "../services/user.service.ts";

export const listUserHandler = async () => {
    const users = await listUsersService()

    
}
