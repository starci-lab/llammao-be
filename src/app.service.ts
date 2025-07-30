import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
} from "@nestjs/common"
import { MagicEdenService } from "./magic-eden"
import {
    CreateTokenDto,
    CreateTokenResponseDto,
    MintNFTDto,
    MintNFTResponseDto,
    RequestMessageResponseDto,
    UpdateCommentXResponseDto,
    UpdateFollowXResponseDto,
    UpdateJoinDiscordResponseDto,
    UpdateLikeXResponseDto,
    VerifyMessageRequest,
    VerifyMessageResponse,
} from "./dtos"
import { Cache } from "cache-manager"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { randomUUID } from "crypto"
import { verifyMessage } from "ethers"
import { InjectModel } from "@nestjs/mongoose"
import { UserSchema } from "./mongoose"
import { Model } from "mongoose"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AppService {
    constructor(
    private readonly magicEdenService: MagicEdenService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
    private readonly jwtService: JwtService,
    ) {}
    private readonly logger = new Logger(AppService.name)

    async createToken(dto: CreateTokenDto): Promise<CreateTokenResponseDto> {
        try {
            return await this.magicEdenService.createToken(dto)
        } catch (error) {
            this.logger.error(error.message)
            throw new BadRequestException(JSON.stringify(error))
        }
    }

    async mintNFT(dto: MintNFTDto): Promise<MintNFTResponseDto> {
        try {
            return await this.magicEdenService.mintNFT(dto)
        } catch (error) {
            this.logger.error(error.message)
            throw new BadRequestException(JSON.stringify(error))
        }
    }

    async requestMessage(): Promise<RequestMessageResponseDto> {
        try {
            const message = randomUUID()
            // cache in 30s
            await this.cacheManager.set(message, true, 1000 * 30)
            return { message }
        } catch (error) {
            this.logger.error(error.message)
            throw new BadRequestException(JSON.stringify(error))
        }
    }

    async verifyMessage(
        dto: VerifyMessageRequest,
    ): Promise<VerifyMessageResponse> {
        try {
            const cacheExisted = await this.cacheManager.get(dto.message)
            if (!cacheExisted) {
                throw new BadRequestException("Message not found")
            }
            const address = verifyMessage(dto.message, dto.signature)
            if (!address) {
                throw new BadRequestException("Invalid signature")
            }
            // process db logic
            const user = await this.userModel.findOne({ userAddress: address })
            if (!user) {
                await this.userModel.create({ userAddress: address })
            }
            return { success: true, token: this.jwtService.sign({ address }) }
        } catch (error) {
            this.logger.error(error.message)
            throw new BadRequestException(JSON.stringify(error))
        }
    }

    async getUser(address: string): Promise<UserSchema | null> {
        return await this.userModel.findOne({ userAddress: address })
    }

    async updateFollowX(address: string): Promise<UpdateFollowXResponseDto> {
        await this.userModel.updateOne({ userAddress: address }, { $set: { followX: true } })
        return { success: true }
    }

    async updateJoinDiscord(address: string): Promise<UpdateJoinDiscordResponseDto> {
        await this.userModel.updateOne({ userAddress: address }, { $set: { joinDiscord: true } })
        return { success: true }
    }

    async updateLikeXPost(address: string): Promise<UpdateLikeXResponseDto> {
        await this.userModel.updateOne({ userAddress: address }, { $set: { likeXPost: true } })
        return { success: true }
    }

    async updateCommentXPost(address: string): Promise<UpdateCommentXResponseDto> {
        await this.userModel.updateOne({ userAddress: address }, { $set: { commentXPost: true } })
        return { success: true }
    }
}
