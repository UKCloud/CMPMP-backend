import express, { NextFunction, Request, Response } from 'express';
import DashboardController from '../controllers/dashboard';
import { isLoggedIn } from '../middleware/authorisation';
import { Dashboard } from '../models/dashboard';
export const dashboardRouter = express.Router();

dashboardRouter.post("/",isLoggedIn, async function (req: Request, res: Response) {
    const controller = new DashboardController();
    const response = await controller.createDashboards(req.body);
    res.status(response[0]);
    return res.json(response[1]);
})

// GET all dashboards
dashboardRouter.get('/', isLoggedIn, async function (req: Request, res: Response) {
    // GET all dashboards
    const controller = new DashboardController();
    const response = await controller.getDashboards();
    return res.json(response);
});

// GET request for retrieving dashboard by ID
dashboardRouter.get('/:id',isLoggedIn, async function (req: Request, res: Response) {
    const controller = new DashboardController();
    const response = await controller.findDashboardById(req.params.id);
    return res.json(response);
});

// DELETE request to delete a dashboard
dashboardRouter.delete('/:id',isLoggedIn, async function (req: Request, res: Response) {
    const controller = new DashboardController();
    const response = await controller.deleteDashboard(req.params.id);
    return res.json(response);
});