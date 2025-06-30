import { Body, Controller, Post } from "@nestjs/common"
import { AppService } from "./app.service"
import { CreateTokenDto, CreateTokenResponseDto, MintNFTDto } from "./dtos"
import { MintNFTResponse } from "./magic-eden/types"
import { ethers } from "ethers"
import { erc1155Abi } from "./1155-abi"
import { erc721Abi } from "./721-abi"

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

  @Post("create-token")
    async createToken(@Body() dto: CreateTokenDto): Promise<CreateTokenResponseDto> {
        return this.appService.createToken(dto)
    }

  @Post("mint-nft")
  async mintNFT(@Body() dto: MintNFTDto): Promise<MintNFTResponse> {
      // create nft
      return this.appService.mintNFT(dto)
  }

  @Post("test-1155")
  async test1155(@Body() dto: Test1155RequestDto): Promise<Test1155ResponseDto> {
      const tokenId = dto?.tokenId || 0
      const owner = dto?.owner || "0x80C34fC701De7caF7036Db13011DC843Aa76d73c"
      const provider = new ethers.JsonRpcProvider(
          "https://testnet-rpc.monad.xyz", 
          10143                            
      )                                                

      // 3. Khởi tạo contract
      const contract = new ethers.Contract(
          "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB", // địa chỉ đã cho
          erc1155Abi,
          provider,
      )
  
      // 4. Gọi view functions
      const [rawUri, rawBal] = await Promise.all([
          contract.uri(tokenId),
          contract.balanceOf(owner, tokenId),
      ])

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
          10143                            
      )   

      const contract = new ethers.Contract(
          "0x06D235F0D8ff77c499A6F647a4d44636acf8584A", // địa chỉ đã cho
          erc721Abi,
          provider,
      )
      
      const tokenIds = await contract.tokensOfOwner(owner)

      const tokens: Array<any> = []
      await Promise.all(tokenIds.map(async (tokenId: number) => {
          const uri = await contract.tokenURI(tokenId)
          tokens.push({
              tokenId: Number(tokenId),
              uri,
          })
      }))

      return {
          tokens,
      }
  }
}

export interface Test1155RequestDto {
  owner: string;      // ví muốn kiểm tra
  tokenId: number;    // id của NFT
}

export interface Test1155ResponseDto {
  balance?: string;   // sẽ được điền thêm
  uri?: string;
}

export interface Test721RequestDto {
  owner: string;
}

export interface Test721ResponseDto {
  tokens: Array<any>;
}