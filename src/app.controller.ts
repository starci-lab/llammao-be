import { Body, Controller, Post } from "@nestjs/common"
import { AppService } from "./app.service"
import { CreateTokenDto, CreateTokenResponseDto } from "./dtos"

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
}
