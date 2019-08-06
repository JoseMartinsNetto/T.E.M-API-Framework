import { Schema, model } from 'mongoose'
import IFile from '../Interfaces/IFile';

const FileSchema = new Schema({
    name: String,
    size: String,
    key: String,
    url: String
}, {
    timestamps: true
})

export default model<IFile>('File', FileSchema)