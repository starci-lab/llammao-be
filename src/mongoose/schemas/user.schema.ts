import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({
    timestamps: true,
    collection: "users"
})
export class UserSchema {
    @Prop({
        required: true,
        unique: true
    })
        userAddress: string

    @Prop({
        default: false
    })
        followX: boolean

    @Prop({
        default: false
    })
        joinDiscord: boolean
    
    @Prop({
        default: false
    })
        likeXPost: boolean

    @Prop({
        default: false
    })
        commentXPost: boolean
}

export const UserSchemaClass = SchemaFactory.createForClass(UserSchema)