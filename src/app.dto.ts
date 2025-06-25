import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator"
import { RoyaltyRecipientDto, MintStagesDto } from "./dtos"

export class PriceCurrencyDto {
    @ApiProperty({ example: "monad-testnet" })
    @IsString()
        chain: string
  
    @ApiProperty({ example: "0x0000000000000000000000000000000000000000" })
    @IsString()
        assetId: string
}

export class PriceDto {
    @ApiProperty({ type: PriceCurrencyDto })
    @ValidateNested()
    @Type(() => PriceCurrencyDto)
        currency: PriceCurrencyDto
  
    @ApiProperty({ example: "0" })
    @IsString()
        raw: string
}


export class MintStageDto {
    @ApiProperty({ example: "public" })
    @IsString()
        kind: string
  
    @ApiProperty({ type: PriceDto })
    @ValidateNested()
    @Type(() => PriceDto)
        price: PriceDto
  
    @ApiProperty({ example: "2025-06-21T05:45:51.585Z" })
    @IsString()
        startTime: string
  
    @ApiProperty({ example: "2025-06-22T05:45:51.585Z" })
    @IsString()
        endTime: string
}
  
export class CreateTokenDto {
  @ApiProperty({ example: "My NFT Collection" })
  @IsString()
      name: string

  @ApiProperty({ example: "MYNFT" })
  @IsString()
      symbol: string

  @ApiProperty({ example: "This is a test collection." })
  @IsString()
      description: string

  @ApiProperty({ example: "ERC1155" })
  @IsString()
      protocol: string

  @ApiProperty({ example: "0xa7c1...da3" })
  @IsString()
      creator: string

  @ApiProperty({ example: 500 }) // 500 = 5.00%
  @IsNumber()
      royaltyBps: number

  @ApiProperty({ type: [RoyaltyRecipientDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoyaltyRecipientDto)
      royaltyRecipients: Array<RoyaltyRecipientDto>

  @ApiProperty({ example: "0xa7c1...da3" })
  @IsString()
      payoutRecipient: string

  @ApiProperty({ type: MintStagesDto })
  @ValidateNested()
  @Type(() => MintStagesDto)
      mintStages: MintStagesDto

  @ApiProperty({
      example: "https://ipfs.io/ipfs/bafkreifw..."
  })
  @IsString()
      imageUrl: string
}
