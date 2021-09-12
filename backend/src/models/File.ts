import { Schema, model } from 'mongoose';

export interface Request{
    ipAdress?: string;
    createdAt: Date;
    userAgent?: string;
}

const requestSchema = new Schema<Request>({
    ipAdress: String,
    createdAt: { type: Date, default: new Date()},
    userAgent: String
});

interface File{
    checksum: string;
    createdAt: Date;
    uploads: number;
    url: string;
    requests: [Request];
}

const schema = new Schema<File>({
    checksum: { type: String, required: true },
    createdAt: { type: Date, default: new Date()},
    uploads: { type: Number, default: 1},
    url: {type: String, required: true},
    requests: [requestSchema]
});

export const FileModel = model<File>('File', schema);
