// import express, { Request, Response } from 'express';
// import myStore from 'express-mysql-session';
// import { app } from '../app';
// import { Dashboard } from '../models/dashboard';
// export const dashboardRouter = express.Router();

// dashboardRouter.post("/", function (req: Request, res: Response) {
//     const createDashboard = {
//         // id : req.body.name,
//         // name : req.body.name,
//         // data : req.body.data,
       

//         id: 2,
//         name: "Second test ",
//         data: "Does this work",
        
//     }
//     Dashboard.create(createDashboard).then(result => {
//         res.status(201).json({
//             message: "succesfully created",
//             post: result
//         });

//     }).catch(error => {
//         res.status(500).json({
//             message: "unsuccessful",
//             error: error
//         })
//     });
// }
// );


// dashboardRouter.get('/:id',  function (req: Request, res: Response) {
//     Dashboard.findByPk(req.params.id).then(Dashboard => res.json(Dashboard));
// });



// //   dashboardRouter.delete('/:id', function (req: Request, res: Response) {
// //     Dashboard.findByPk(req.params.id).then(function(dashboard) {
// //         dashboard.destroy();
// //       }).then((dashboard) => {
// //         res.sendStatus(200);
// //       });
// // });

