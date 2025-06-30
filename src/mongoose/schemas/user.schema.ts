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
}

export const UserSchemaClass = SchemaFactory.createForClass(UserSchema)