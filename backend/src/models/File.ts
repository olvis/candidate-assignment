import { Schema, model } from 'mongoose';

export interface Upload{
    ipAddress?: string;
    createdAt: Date;
    userAgent?: string;
}

const uploadSchema = new Schema<Upload>({
    ipAddress: String,
    createdAt: { type: Date, default: new Date()},
    userAgent: String
});

interface File{
    checksum: string;
    createdAt: Date;
    numberOfUploads: number;
    url: string;
    uploads: [Upload];
}

const schema = new Schema<File>({
    checksum: { type: String, required: true },
    createdAt: { type: Date, default: new Date()},
    numberOfUploads: { type: Number, default: 1},
    url: {type: String, required: true},
    uploads: [uploadSchema]
});

export const FileModel = model<File>('File', schema);
