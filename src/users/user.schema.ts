import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    // @Prop()
    // userId: string

    @Prop({
        required: [true, 'please provide name'],
        maxlength: 30,
        minlength : 2,
    })
    name: string

    @Prop({
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        unique : true
    })
    email: string

    @Prop({
        required: [true, 'please provide password'],
        minlength : 6,
    })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)