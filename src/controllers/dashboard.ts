import { Body, Delete, Get, Path, Post, Route } from "tsoa";
import { Dashboard } from "../models/dashboard";

interface DashboardPayload {
    id: number,
    name: string,
    data: string
}

@Route("dashboard")
export default class DashboardController {
    /**
     * Gets all dashboards and returns them
     * @returns {Promise<any>}
     */
    @Get("/")
    public async getDashboards(): Promise<any> {
        const result = await Dashboard.findAll()
        return {
            message: "all dashboards",
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
        const result = await Dashboard.findByPk(id)
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
        const result = await Dashboard.findByPk(id);
        if(result){
        result.destroy();
        }
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

        const dashboard = await Dashboard.findByPk(payload.id)
        if (dashboard) {
            try {
                const result = await dashboard.update(payload)
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
                const result = await Dashboard.create({name: payload.name, data: payload.data})
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