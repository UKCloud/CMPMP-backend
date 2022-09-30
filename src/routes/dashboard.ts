import express, { NextFunction, Request, Response } from 'express';
import { Dashboard } from '../models/dashboard';
export const dashboardRouter = express.Router();

dashboardRouter.post("/", function (req: Request, res: Response) {
    const createDashboard = {
        name: req.body.name,
        data: req.body.data,
    }
    console.log(req.body.id)
    Dashboard.findByPk(req.body.id).then(dashboard => {
        if (dashboard) {
            dashboard.update(createDashboard).then(result => {
                // Updates dashboard 
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

// GET request to read dashboard ID
dashboardRouter.get('/:id', function (req: Request, res: Response) {
    Dashboard.findByPk(req.params.id).then(Dashboard => res.json(Dashboard));
    console.log(req.params.id);
});


// DELETE request to delete a dashboard
dashboardRouter.delete('/:id', function (req: Request, res: Response) {
    const id = req.params.id;
    Dashboard.findByPk(id).then(function (createDashboard) {
        createDashboard?.destroy();
    }).then((createDashboard) => {
        res.sendStatus(200);

    });
});


