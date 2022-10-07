import { Get, Route, Request } from "tsoa";
import { keycloakClient } from "../app";

@Route("user")
export default class UserController {

    @Get("/")
    public async findUserById(@Request() req: Express.Request): Promise<any> {
        const userInfo = await keycloakClient.introspect(String(req.user?.id_token))
        return userInfo;
    }
}