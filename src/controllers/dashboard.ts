import { Body, Delete, Get, Path, Post, Route } from "tsoa";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
interface DashboardPayload {
    id: number,
    name: string,
    data: string
}

@Route("dashboard")
export default class DashboardController {
    @Get("/")
    public async getDashboards(): Promise<any> {
        const result = await prisma.dashboards.findMany()
        return {
            message: "all dashboards",
            allDashboard: result,
        }
    }

    @Get("/:id")
    public async findDashboardById(@Path() id: string): Promise<any> {
        const result = await prisma.dashboards.findUnique({
            where : {
                id:Number(id) 
            }
        })
        if(result){
            return {
                message: "dashboard by id",
                dashboard: result,
            }
        }
        else
        {
            return {
                message: "couldn't find dashboard",
                dashboard: null,
            }
        } 
    }

    @Delete("/:id")
    public async deleteDashboard(@Path() id: string): Promise<any> {
        const result = await prisma.dashboards.delete({
            where : {
                id:Number(id) 
            }
        });
        if(result){
        // result.destroy();
        return [200,{
            message: "dashboard deleted"
        }]}
        else
        {
            return [404,{
                message: "couldn't find dashboard to be deleted"
        }]}
    }

    @Post("/")
    public async createDashboards(@Body() payload: DashboardPayload): Promise<any> {

        const dashboard = await prisma.dashboards.findUnique({
            where : {
                id: payload.id
            }
        })
        if (dashboard) {
            try {
                const result = await prisma.dashboards.update({
                    where : {
                        id : payload.id
                    },
                    data : payload
                })
                return [200, {
                    message: "succesfully updated",
                    createDashboard: result,
                }]
            }
            catch (e) {
                return [500, {
                    message: "unsuccessfully updated",
                    error: e
                }]
            }
        }
        else{
            try{
                const result = await prisma.dashboards.create({
                    data : payload
                })
                return [200, {
                    message: "successfully created dashboard",
                    createDashboard: result,
                }]
            }
            catch(e) {
                return [500, {
                    message: "failed to create dashboard",
                    error: e
                }]
            }
        }
    }   
}