import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common"
import { AppService } from "./app.service"
import {
    CreateTokenDto,
    CreateTokenResponseDto,
    MintNFTDto,
    RequestMessageResponseDto,
    UpdateCommentXResponseDto,
    UpdateFollowXResponseDto,
    UpdateJoinDiscordResponseDto,
    UpdateLikeXResponseDto,
    VerifyMessageRequest,
    VerifyMessageResponse,
} from "./dtos"
import { MintNFTResponse } from "./magic-eden/types"
import { ethers } from "ethers"
import { erc1155Abi } from "./1155-abi"
import { erc721Abi } from "./721-abi"
import { UserSchema } from "./mongoose"
import { JwtAuthGuard, User } from "./jwt.strategy"
import { Throttle } from "@nestjs/throttler"
import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "csv-parse/sync"
console.log(join)
@Controller({
    path: "/api",
    version: "1",
})
export class AppController {
    constructor(
    private readonly appService: AppService,
    // @InjectModel(NFTSchema.name) private nftModel: Model<NFTSchema>,
    // @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    ) {}

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post("create-token")
    async createToken(
    @Body() dto: CreateTokenDto,
    ): Promise<CreateTokenResponseDto> {
        return this.appService.createToken(dto)
    }
    
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post("mint-nft")
  async mintNFT(@Body() dto: MintNFTDto): Promise<MintNFTResponse> {
      // create nft
      return this.appService.mintNFT(dto)
  }

  @Post("test-1155")
  async test1155(
    @Body() dto: Test1155RequestDto,
  ): Promise<Test1155ResponseDto> {
      const tokenId = dto?.tokenId || 0
      const owner = dto?.owner || "0x80C34fC701De7caF7036Db13011DC843Aa76d73c"
      const provider = new ethers.JsonRpcProvider(
          "https://testnet-rpc.monad.xyz",
          10143,
      )

      // 3. Khởi tạo contract
      const contract = new ethers.Contract(
          "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB", // địa chỉ đã cho
          erc1155Abi,
          provider,
      )

      const uriCollection = await contract.contractURI()
      console.log(uriCollection)

      // 4. Gọi view functions
      const [rawUri, rawBal] = await Promise.all([
          contract.uri(tokenId),
          contract.balanceOf(owner, tokenId),
      ])

      const isERC721 = await contract.supportsInterface("0x80ac58cd")
      const isERC721Metadata = await contract.supportsInterface("0x5b5e139f")
      const isERC1155 = await contract.supportsInterface("0xd9b67a26")
      console.log(isERC721, isERC721Metadata, isERC1155)

      return {
          uri: rawUri,
          balance: rawBal.toString(),
      }
  }

  @Post("test-721")
  async test721(@Body() dto: Test721RequestDto): Promise<Test721ResponseDto> {
      const owner = dto?.owner || "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3"
      const provider = new ethers.JsonRpcProvider(
          "https://testnet-rpc.monad.xyz",
          10143,
      )

      const contract = new ethers.Contract(
          "0x06D235F0D8ff77c499A6F647a4d44636acf8584A", // địa chỉ đã cho
          erc721Abi,
          provider,
      )

      const uriCollection = await contract.contractURI()
      console.log(uriCollection)

      const isERC721 = await contract.supportsInterface("0x80ac58cd")
      const isERC721Metadata = await contract.supportsInterface("0x5b5e139f")
      const isERC1155 = await contract.supportsInterface("0xd9b67a26")
      console.log(isERC721, isERC721Metadata, isERC1155)

      const tokenIds = await contract.tokensOfOwner(owner)

      const tokens: Array<any> = []
      await Promise.all(
          tokenIds.map(async (tokenId: number) => {
              const uri = await contract.tokenURI(tokenId)
              tokens.push({
                  tokenId: Number(tokenId),
                  uri,
              })
          }),
      )

      return {
          tokens,
      }
  }
  
  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post("/request-message")
  async requestMessage(): Promise<RequestMessageResponseDto> {
      return this.appService.requestMessage()
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post("/verify-message")
  async verifyMessage(
    @Body() dto: VerifyMessageRequest,
  ): Promise<VerifyMessageResponse> {
      return this.appService.verifyMessage(dto)
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Get("/user/:id")
  async getUser(@Param("id") id: string) {
      const user = {
          winner: {
              winLlamaoAwakening: false,
              winLlamaoGTD: false,
              winMonadverseFCFS: false,
              winMonadverseGTD: false,
              winNadNameServiceGTD: false,
              winOvernadsGTD: false,
              winOvernadsFCFS: false,
              winChewyFCFS: false,
              winChewyGTD: false,
              winSLMNDFCFS: false,
              winLaMouchGTD: false,
              win$CHOGtoken: false,
          }
      }
      const awakeningCsv = readFileSync(join(process.cwd(), "datasets/awakening.csv"), "utf8")
      const awakeningRecords = parse(awakeningCsv, {
          columns: true,
          skip_empty_lines: true,
      })
      const awakeningRecord = awakeningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
      }
      )
      if (awakeningRecord) {
          user.winner.winLlamaoAwakening = true
      }
      const winningCsv = readFileSync(join(process.cwd(), "datasets/winner.csv"), "utf8")
      const winningRecords = parse(winningCsv, {
          columns: true,
          skip_empty_lines: true,
      })
      const winLLamaoGtd = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          console.log(record["Wallet Address"].trim().toLowerCase(), id.trim().toLowerCase())
          console.log(record["Title"].trim().toLowerCase(), "Llamao GTD")
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Llamao GTD").trim().toLowerCase()
      }
      )
      if (winLLamaoGtd) {
          user.winner.winLlamaoGTD = true
      }
      const winMonadverseFCFS = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Monadverse FCFS").trim().toLowerCase()
      }
      )
      if (winMonadverseFCFS) {
          user.winner.winMonadverseFCFS = true
      }
      const winMonadverseGTD = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Monadverse GTD").trim().toLowerCase()
      }
      )
      if (winMonadverseGTD) {
          user.winner.winMonadverseGTD = true
      }
      const winNadNameServiceGTD = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Nad Name Service GTD").trim().toLowerCase()
      }
      )
      if (winNadNameServiceGTD) {
          user.winner.winNadNameServiceGTD = true
      }
      const winOvernadsGTD = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Overnads GTD").trim().toLowerCase()
      }
      )
      if (winOvernadsGTD) {
          user.winner.winOvernadsGTD = true
      }
      const winOvernadsFCFS = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Overnads FCFS").trim().toLowerCase()
      }
      )
      if (winOvernadsFCFS) {
          user.winner.winOvernadsFCFS = true
      }
      const winChewyFCFS = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Chewy FCFS").trim().toLowerCase()
      }
      )
      if (winChewyFCFS) {
          user.winner.winChewyFCFS = true
      }
      const winChewyGTD = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("Chewy GTD").trim().toLowerCase()
      }
      )
      if (winChewyGTD) {
          user.winner.winChewyGTD = true
      }
      const winSLMNDFCFS = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("SLMND FCFS").trim().toLowerCase()
      }
      )
      if (winSLMNDFCFS) {
          user.winner.winSLMNDFCFS = true
      }
      const winLaMouchGTD = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("La Mouch GTD").trim().toLowerCase()
      }
      )
      if (winLaMouchGTD) {
          user.winner.winLaMouchGTD = true
      }
      const win$CHOGtoken = winningRecords.some((record: Array<{ [key: string]: string }>) => 
      {
          return record["Wallet Address"].trim().toLowerCase() === id.trim().toLowerCase()
          && record["Title"].trim().toLowerCase() === ("$CHOG token").trim().toLowerCase()
      }
      )
      if (win$CHOGtoken) {
          user.winner.win$CHOGtoken = true
      }
      console.log(user)
      return user
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @UseGuards(JwtAuthGuard)
  @Post("/update-follow-x")
  async updateFollowX(
    @User() user: { userAddress: string },
  ): Promise<UpdateFollowXResponseDto> {
      return this.appService.updateFollowX(user.userAddress)
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @UseGuards(JwtAuthGuard)
  @Post("/update-season2")
  async updateSeason2(
    @User() user: { userAddress: string },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Body() dto: any,
  ) {
      return this.appService.updateSeason2(user.userAddress, dto)
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @UseGuards(JwtAuthGuard)
  @Post("/update-join-discord")
  async updateJoinDiscord(
    @User() user: { userAddress: string },
  ): Promise<UpdateJoinDiscordResponseDto> {
      return this.appService.updateJoinDiscord(user.userAddress)
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @UseGuards(JwtAuthGuard)
  @Post("/update-like-x-post")
  async updateLikeXPost(
    @User() user: { userAddress: string },
  ): Promise<UpdateLikeXResponseDto> {
      return this.appService.updateLikeXPost(user.userAddress)
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @UseGuards(JwtAuthGuard)
  @Post("/update-comment-x-post")
  async updateCommentXPost(
    @User() user: { userAddress: string },
  ): Promise<UpdateCommentXResponseDto> {
      return this.appService.updateCommentXPost(user.userAddress)
  }

  @Throttle({ default: { limit: 20  , ttl: 60 } })
  @Get("/users")
  async users(): Promise<UserSchema[]> {
      return this.appService.getUsers()
  }
}

export interface Test1155RequestDto {
  owner: string; // ví muốn kiểm tra
  tokenId: number; // id của NFT
}

export interface Test1155ResponseDto {
  balance?: string; // sẽ được điền thêm
  uri?: string;
}

export interface Test721RequestDto {
  owner: string;
}

export interface Test721ResponseDto {
  tokens: Array<any>;
}
