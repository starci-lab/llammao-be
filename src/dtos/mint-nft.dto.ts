import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { NFTKind, NFTProtocol } from "../magic-eden/types"
import { StepDto } from "./create-token.dto"

export class WalletDto {
    @ApiProperty({ example: "0x1234567890abcdef" })
    @IsString()
        address: string

    @ApiProperty({ example: "monad-testnet" })
    @IsString()
        chain: string
}

export class MintNFTDto {
    @ApiProperty({ example: "monad-testnet" })
    @IsString()
        chain: string

    @ApiProperty({ example: "1234567890abcdef" })
    @IsString()
        collectionId: string

    @ApiProperty({ example: "0x1234567890abcdef" })
        wallet: WalletDto

    @ApiProperty({ example: 1 })
    @IsNumber()
        nftAmount: number

    @ApiProperty({ example: "public" })
    @IsString()
        kind: NFTKind
    protocol: NFTProtocol

    @ApiProperty({ example: 1 })
    @IsNumber()
        tokenId: number
}

export class MintNFTResponseDto {
    @ApiProperty({ type: [StepDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepDto)
        steps: Array<StepDto>
}
    