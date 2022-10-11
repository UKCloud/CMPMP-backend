import { Body, Delete, Get, Path, Post, Route, Query } from "tsoa";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export interface DashboardPayload {
    id: number,
    name: string,
    data: string
    group: string
}

@Route("dashboard")
export default class DashboardController {
    /**
     * Gets all dashboards and returns them
     * @param {number} id ID of a dashboard 
     * @param {number} name Name of a dashboard 
     * @param {number} group Find dashboards within a group
     */
    @Get("/")
    public async getDashboards(@Query() id?:number, @Query() name?: string, @Query() group?:string): Promise<any> {
        
        if (id) id = Number(id);
        const result = await prisma.dashboards.findMany({where: {
            id: id,
            name: name,
            group: group
        }})
        return {
            message: result.length > 0 ? "all dashboards" : "no dashboards found",
            allDashboard: result,
        }
    }

    /**
     * Gets a specific dashboard using it's ID, then returns it
     * @param {string} id 
     * @returns {Promise<any>}
     */
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

    /**
     * Deletes a specified dashboard using it's ID, if it can't find the specified dashboard returns a 404 error.
     * @param {string} id 
     * @returns {Promise<any>}
     */
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

    /**
     * Creates a new dashboard using a passed in payload of dashboard information.
     * If the dashboard already exists it updates the existing dashboard (and returns a 500 error if this fails)
     * If it does not exist yet, it creates it and returns a 500 error if this fails
     * @param {DashboardPayload} payload 
     * @returns {Promise<any>}
     */
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