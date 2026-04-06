import { HttpError } from "./errors/HttpError"
import { HttpStatus } from "./status"

export const exist = (value:any) => {
    if(!value){
        throw new HttpError("Some data are missing", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return true
}