// import express, { Request, Response } from 'express';
// import MySQLStore from 'express-mysql-session';
// import { app } from '../app';
// import { Dashboard } from '../models/dashboard';
// export const dashboardRouter = express.Router();


// function createDashboard(req : Request, res: Response){
//     const post = {
//         id : req.body.id,
//         name : req.body.name,
//         data : req.body.data,
//         createdAt : req.body.createdAt,
//         updatedAt : req.body.updatedAt
//     }
// }


// dashboardRouter.post('/',(req,res)=>{


//     const dashboard = {
//         id : req.body.id,
//         name : req.body.name,
//         data : req.body.data,
//         createdAt : req.body.createdAt,
//         updatedAt : req.body.updatedAt
//     }
//     MySQLStore.query('INSERT INTO dashboards VALUES ()', [id,name,data,createdAt,updatedAt],(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send("Created")
//         }
//     })
// }
// )
// dashboardRouter.get('/:id',  function (req: Request, res: Response) {
//     Dashboard.findAll({ where: { id: req.params.id } }).then(Dashboard => res.json(Dashboard));
// });



//   dashboardRouter.delete('/:id', function (req: Request, res: Response) {
//     Dashboard.findByPk(req.params.id).then(function(dashboard) {
//         dashboard.destroy();
//       }).then((dashboard) => {
//         res.sendStatus(200);
//       });
// });

// // app.post('/',function(req :  Request,res: Response)  {
// //     console.log("sonam")
// // })