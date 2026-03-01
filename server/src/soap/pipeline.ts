import type {Request, Response} from 'express';
import { parseXml } from './parse.ts';
import { dispatchHandler } from './dispatch.ts';

export const pipeline = async (req:Request, res:Response) => {
    const xml = req.body;
   const {operationType, payload} = await parseXml(xml)
   dispatchHandler(operationType, payload)
   

    
    
    
    res.json({message:"rsgfjhsgfjhsgfjhdsgfjh"})
}