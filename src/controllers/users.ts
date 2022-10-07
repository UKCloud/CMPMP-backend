import { Body, Delete, Get, Path, Post, Route, Request } from "tsoa";
import { keycloakClient } from "../app";
import { User } from "../models/users";

@Route("user")
export default class UserController {

    @Get("/")
    public async findUserById(@Request() req: Express.Request): Promise<any> {
        const userInfo = await keycloakClient.introspect(String(req.user?.id_token))
        return userInfo;
    }

}


