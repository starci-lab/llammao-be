import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UserSchema } from "./user.schema"
import { Schema as MongooseSchema, Types } from "mongoose"

@Schema({
    timestamps: true,
    collection: "nfts"
})
export class NFTSchema {
    @Prop({
        required: false
    })
        imageUrl: string

    @Prop({
        required: true
    })
        collectionAddress: string

    @Prop({
        required: true
    })
        tokenId: number

    @Prop({
        required: false
    })
        nftName: string

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: UserSchema.name,
        index: true
    })
        user: UserSchema | Types.ObjectId

    @Prop({
        default: true,
    })
        verified: boolean
}

export const NFTSchemaClass = SchemaFactory.createForClass(NFTSchema)