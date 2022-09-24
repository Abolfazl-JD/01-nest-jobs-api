import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema'

export type JobDocument = Job & Document

@Schema({ timestamps: true })
export class Job {
    @Prop({
        required : [true, 'please provide the company name'],
        maxlength: 50,
        minlength : 3
    })
    company: string

    @Prop({
        required : [true, 'please provide the position for the job'],
        maxlength : 50,
        minlength : 3
    })
    position: string

    @Prop({
        enum : ['interview', 'declined', 'pending'],
        default : 'pending'
    })
    status: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: User;

    // @Prop()
    // createdAt?: Date

    // @Prop()
    // updatedAt?: Date
}

export const JobSchema = SchemaFactory.createForClass(Job)