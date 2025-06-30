import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AddNFTResponseDto {
    @ApiProperty({ example: "0x1234567890abcdef" })
    @IsString()
        collectionAddress: string

    @ApiProperty({ example: 1 })
    @IsNumber()
        tokenId: number
}