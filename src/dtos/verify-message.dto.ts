import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class VerifyMessageRequest {
    @ApiProperty({ example: "cef19d2b-9f03-4abb-ac1d-12836bd9860e" })
    @IsString()
        message: string

    @ApiProperty({ example: "0x123abc..." })
    @IsString()
        signature: string
}

export class VerifyMessageResponse {
    @ApiProperty({ example: true })
    @IsString()
        success: boolean
}