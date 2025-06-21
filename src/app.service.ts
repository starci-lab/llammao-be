import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import { MagicEdenService } from "./magic-eden"
import { CreateTokenDto, CreateTokenResponseDto } from "./dtos"

@Injectable()
export class AppService {
    constructor(private readonly magicEdenService: MagicEdenService) {}
    private readonly logger = new Logger(AppService.name)
    async createToken(dto: CreateTokenDto): Promise<CreateTokenResponseDto> {
        try {
            return await this.magicEdenService.createToken(dto)
        } catch (error) {
            this.logger.error(error.message)
            throw new BadRequestException(JSON.stringify(error))
        }
    }
}
