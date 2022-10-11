import { Get, Route, Request } from "tsoa";
import { keycloakClient } from "../app";

@Route("users")
export default class UserController {

    /**
     * Finds a specified user by their id, using information gained from the express request object.
     * Returns the specified user's information
     * @param {Express.Request} req 
     * @returns {Promise<any>}
     */
    @Get("/")
    public async findUserById(@Request() req: Express.Request): Promise<any> {
        const userInfo = await keycloakClient.introspect(String(req.user?.id_token))
        return userInfo;
    }
}