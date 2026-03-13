import type {Request, Response} from 'express';
import { parseXml } from './parse.ts';
import { dispatchHandler } from './dispatch.ts';

export const pipeline = async (req:Request, res:Response) => {
    try{
        const xml = req.body;
       const {operationType, payload} = await parseXml(xml)
       const result  = await dispatchHandler(operationType, payload)
    //    res.set("Content-type", "text/xml")
        res.json(result)

    } catch(e){
        console.log(e);
        res.status(500).json({message: "Internal server error"})
    }
}