import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Schema as MongooseSchema } from "mongoose"

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

    @Prop({
        required: false,
        default: {},
        type: MongooseSchema.Types.Mixed
    })
        season2: Record<string, string>

    @Prop({
        unique: false
    })
        nftOwned?: "minted" | "not_minted"
}

export const UserSchemaClass = SchemaFactory.createForClass(UserSchema)