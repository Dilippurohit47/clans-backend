import { Router,Response,Request } from "express";

const router  = Router()

router.post("/" , async(req:Request,res:Response) =>{

    const body  = req.body;


})

export default router