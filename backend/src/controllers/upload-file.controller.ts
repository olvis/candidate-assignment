
import {Request, Response} from 'express';
import { FileModel, Request as RequestDb } from "../models/File";
import { FileService } from "../services/file.service";

export class UploadFileController {

    private readonly fileService : FileService = new FileService();

    async handle(req: Request, res: Response) {
        if (!req.file){
            res.status(422).send("File not found in the request");
            return;
        }
        const filePath = req.file!.path;
        const originalName = req.file!.originalname;
        const hash = await this.fileService.computeHash(filePath);
        const fileObj = await FileModel.findOne({checksum: hash});

        if (fileObj){
            console.log("File already exists");
            await fileObj.updateOne({$inc : {'uploads' : 1}, $push: { 'requests': this.getRequestForDb(req)}});
        }
        else{
            // New file
            const isExe = await this.fileService.isPortableExecutable(filePath);
            if (!isExe) {
                // File is not a PE
                res.status(201).send("File has been processed successfully");
                return;
            }

            // Save the file
            const s3Url = await this.fileService.preserveFile(filePath, originalName);
            await FileModel.create({
                checksum: hash,
                url: s3Url,
                requests : [
                    this.getRequestForDb(req)
                ]
            });
        }

        res.status(201).send("File has been processed successfully");
    }


    private getRequestForDb(req: Request) : RequestDb {
        return {
            ipAdress: req.headers['x-forwarded-for']?.toString(),
            userAgent: req.headers['user-agent']?.toString(),
            createdAt: new Date()
        };
    }


}