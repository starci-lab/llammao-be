import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Schema as MongooseSchema } from "mongoose"
import { IsBoolean } from "class-validator"

export class WinnerDto {
    @IsBoolean()
        winLlamaoAwakening: boolean
  
    @IsBoolean()
        winLlamaoGTD: boolean
  
    @IsBoolean()
        winMonadverseFCFS: boolean
  
    @IsBoolean()
        winMonadverseGTD: boolean
  
    @IsBoolean()
        winNadNameServiceGTD: boolean
  
    @IsBoolean()
        winOvernadsGTD: boolean
  
    @IsBoolean()
        winOvernadsFCFS: boolean
  
    @IsBoolean()
        winChewyFCFS: boolean
  
    @IsBoolean()
        winChewyGTD: boolean
  
    @IsBoolean()
        winSLMNDFCFS: boolean
  
    @IsBoolean()
        winLaMouchGTD: boolean
  
    @IsBoolean()
        win$CHOGtoken: boolean
}

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

    winner: WinnerDto
}

export const UserSchemaClass = SchemaFactory.createForClass(UserSchema)