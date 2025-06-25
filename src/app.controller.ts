import { Body, Controller, Post } from "@nestjs/common"
import { AppService } from "./app.service"
import { CreateTokenDto, CreateTokenResponseDto, MintNFTDto } from "./dtos"
import { MintNFTResponse } from "./magic-eden/types"

@Controller({
    path: "/api",
    version: "1",
})
export class AppController {
    constructor(private readonly appService: AppService) {}

  @Post("create-token")
    createToken(@Body() dto: CreateTokenDto): Promise<CreateTokenResponseDto> {
        return this.appService.createToken(dto)
    }

    @Post("mint-nft")
  mintNFT(@Body() dto: MintNFTDto): Promise<MintNFTResponse> {
      return this.appService.mintNFT(dto)
  }   
}
