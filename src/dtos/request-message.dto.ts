import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class RequestMessageResponseDto {
    @ApiProperty({ example: "cef19d2b-9f03-4abb-ac1d-12836bd9860e" })
    @IsString()
        message: string
}