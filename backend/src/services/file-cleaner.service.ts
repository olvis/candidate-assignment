import { Request } from "express";
import { promises as fsPromises } from 'fs';

export class FileCleaner{

    async cleanUpFile(req: Request){
       const path = req.file?.path;
       if (!path) return;
       try{
           await fsPromises.unlink(path);
           console.log(`[FileCleaner] ${path} was deleted`);
       }
       finally{
           console.log("[FileCleaner] finally block")
       }
    }
}