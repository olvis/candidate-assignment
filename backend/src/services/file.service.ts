import crypto from "crypto";
import fs from "fs";

import * as AWS from "aws-sdk";

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const IAM_USER_KEY = process.env.S3_USER_KEY!;
const IAM_USER_SECRET = process.env.S3_USER_SECRET!;

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});


export class FileService{
    computeHash(filePath: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const hash = crypto.createHash("md5");
            const rs = fs.createReadStream(filePath)
            rs.on('error', function(err) {
                reject(err);
            });
            rs.on('data', function(chunk) {
                hash.update(chunk);
            });
            rs.on('end', function() {
                const result = hash.digest('hex')
                resolve(result);
            });
        });
    }


    async preserveFile(path: string, originalName: string) : Promise<string> {
        const targetName = `${new Date().getTime()}_${originalName}`;
        const readStream = fs.createReadStream(path);
        const params = {
            Bucket: BUCKET_NAME,
            Key: `files/${targetName}`,
            Body: readStream
        };
        const result = await s3bucket.upload(params).promise();
        return result.Location;
    }

    // https://stackoverflow.com/a/2863740/5728656
    async isPortableExecutable(filePath: string) : Promise<boolean> {
        const firstTwoBytes = await this.readFirstNBytes(filePath, 2);
        const fileHeader = firstTwoBytes.toString("utf-8", 0, 2);
        return fileHeader === "MZ";
    }

    private async readFirstNBytes(path: fs.PathLike, n: number): Promise<Buffer> {
        const chunks = [];
        for await (const chunk of fs.createReadStream(path, { start: 0, end: n })) {
          chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
}