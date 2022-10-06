import express, { NextFunction, Request, Response } from 'express';
import DashboardController from '../controllers/dashboard';
import { isLoggedIn } from '../middleware/authorisation';
import { Dashboard } from '../models/dashboard';
export const dashboardRouter = express.Router();

dashboardRouter.post("/",isLoggedIn, function (req: Request, res: Response) {
    const createDashboard = {
        name: req.body.name,
        data: req.body.data,
    }
    console.log(req.body.id)
    Dashboard.findByPk(req.body.id).then(dashboard => {
        if (dashboard) {
            dashboard.update(createDashboard).then(result => {
                // Updates dashboards 
                res.status(200).json({
                    message: "succesfully updated",
                    createDashboard: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "unsuccessfully updated",
                    error: error
                })
            })
        } else {
            // Create dashboards
            Dashboard.create(createDashboard).then(result => {
                res.status(200).json({
                    message: "succesfully created",
                    createDashboard: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "unsuccessfully created",
                    error: error
                })
            });
        }
    })
    // }
})

// GET all dashboards
dashboardRouter.get('/', isLoggedIn, async function (req: Request, res: Response) {
    // GET all dashboards
    const controller = new DashboardController();
    const response = await controller.getDashboards();
    return res.json(response);
});

// GET request for retrieving dashboard by ID
dashboardRouter.get('/:id',isLoggedIn, function (req: Request, res: Response) {
    Dashboard.findByPk(req.params.id).then(Dashboard => res.json(Dashboard));
    console.log(req.params.id);
});

// DELETE request to delete a dashboard
dashboardRouter.delete('/:id',isLoggedIn, function (req: Request, res: Response) {
    Dashboard.findByPk(req.params.id).then(function (createDashboard) {
        createDashboard?.destroy();
    }).then((createDashboard) => {
        res.sendStatus(200);
    });
});


