import { Get, Route } from "tsoa";
import { Dashboard } from "../models/dashboard";


@Route("dashboard")
export default class DashboardController {
    @Get("/")
    public async getDashboards(): Promise<any> {
        const result = await Dashboard.findAll()
        return {
            message: "all dashboards",
            allDashboard: result,
        }
    }
}