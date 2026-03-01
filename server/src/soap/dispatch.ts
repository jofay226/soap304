import { createUserHandler } from "../handlers/user.create.ts"
import { deleteUserHandler } from "../handlers/user.delete.ts"
import { listUserHandler } from "../handlers/user.list.ts"
import { updateUserHandler } from "../handlers/user.update.ts"


export const dispatchHandler = (operationType : string, payload) => {
    switch(operationType) {
        case "createUserRequest":
            return createUserHandler(payload)
        case "listUsersRequest" :
            return listUserHandler()
        case "updateUserRequest":
            return updateUserHandler(payload)
        case "deleteUserRequest":
            return deleteUserHandler(payload)        
    }
}