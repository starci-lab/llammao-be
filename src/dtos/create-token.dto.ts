import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator"
import { PriceDto } from "src/app.dto"

export class RoyaltyRecipientDto {
  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      address: string

  @ApiProperty({ example: 100, description: "100 = 100%" })
  @IsNumber()
      share: number
}

export class PriceCurrencyDto {
  @ApiProperty({ example: "monad-testnet" })
  @IsString()
      chain: string

  @ApiProperty({ example: "0x0000000000000000000000000000000000000000" })
  @IsString()
      assetId: string
}

export class MintStageDto {
  @ApiProperty({ example: "public" })
  @IsString()
      kind: string

  @ApiProperty({ type: PriceDto })
  @ValidateNested()
  @Type(() => PriceDto)
      price: PriceDto

  @ApiProperty({ example: "2025-06-21T05:00:00Z" })
  @IsString()
      startTime: string

  @ApiProperty({ example: "2025-06-22T05:00:00Z" })
  @IsString()
      endTime: string
}

export class MintStagesDto {
  @ApiProperty({ type: [MintStageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MintStageDto)
      stages: MintStageDto[]

  @ApiProperty({ example: 0, description: "0 means no wallet limit" })
  @IsNumber()
      walletLimit: number

  @ApiProperty({ example: null, nullable: true })
  @IsOptional()
      maxSupply: number | null

  @ApiProperty({ example: 0 })
  @IsNumber()
      tokenId: number
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

  @ApiProperty({ example: "monad-testnet" })
  @IsString()
      chain: string

  @ApiProperty({ example: "ERC1155" })
  @IsString()
      protocol: string

  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      creator: string

  @ApiProperty({
      example: 1000,
      description: "Royalty in basis points (e.g. 1000 = 10%)",
  })
  @IsNumber()
      royaltyBps: number

  @ApiProperty({ type: [RoyaltyRecipientDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoyaltyRecipientDto)
      royaltyRecipients: Array<RoyaltyRecipientDto>

  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      payoutRecipient: string

  @ApiProperty({ type: MintStagesDto })
  @ValidateNested()
  @Type(() => MintStagesDto)
      mintStages: MintStagesDto

  @ApiProperty({ example: "https://ipfs.io/ipfs/your-image-hash" })
  @IsString()
      imageUrl: string
}

export class TransactionParamsDto {
  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      from: string

  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      to: string

  @ApiPropertyOptional({ example: "0" })
  @IsOptional()
  @IsString()
      value?: string

  @ApiProperty({ example: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3" })
  @IsString()
      data: string
}

export class StepDto {
  @ApiProperty({ example: "create-token" })
  @IsString()
      id: string

  @ApiProperty({ example: "monad-testnet" })
  @IsString()
      chain: string

  @ApiProperty({ example: "eth_sendTransaction" })
  @IsString()
      method: string

  @ApiProperty({ type: TransactionParamsDto })
  @ValidateNested()
  @Type(() => TransactionParamsDto)
      params: TransactionParamsDto
}

export class MetadataDto {
  @ApiProperty({
      example: "https://img-cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmonad-testnet%2Fi9YO%252F4yHXUdJsWcTqhqvf9yg6go00GTqQUQm60UBVbatJ6Ue4%252By3qfS2sR94i%252FyHtjjT6c6CLe7p2cxjsLWdOOVBpiGqVL4P1tDVckjJr9OcIeIrCS3Q9waK2kY0kN4T",
  })
  @IsString()
      imageUrl: string

  @ApiProperty({
      example: "https://img-cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmonad-testnet%2Fi9YO%252F4yHXUdJsWcTqhqvf9yg6go00GTqQUQm60UBVbatJ6Ue4%252By3qfS2sR94i%252FyHtjjT6c6CLe7p2cxjsLWdOOVBpiGqVL4P1tDVckjJr9OcIeIrCS3Q9waK2kY0kN4T",
  })
  @IsString()
      metadataUrl: string
}

export class CreateTokenResponseDto {
    @ApiProperty({ type: [StepDto] })
    @ValidateNested({ each: true })
    @Type(() => StepDto)
        steps: Array<StepDto>
  
    @ApiProperty({ type: MetadataDto })
    @ValidateNested()
    @Type(() => MetadataDto)
        metadata: MetadataDto
}