import { Injectable } from "@nestjs/common"
@Injectable()
export class AppCronService {
    // private users: Array<UserSchema>
    // private currentIndex = 0
    // constructor(
    // @InjectModel(UserSchema.name)
    // private readonly userModel: Model<UserSchema>,
    // ) {}
    // async onModuleInit() {
    //     this.users = await this.userModel.find({
    //         nftOwned: {
    //             $exists: true
    //         }
    //     })
    //     // Chỉ chọn 2 field
    //     const fields = ["userAddress", "nftOwned"]
    //     const csv = parse(this.users, { fields })
    //     const filePath = path.join(process.cwd(), "users.csv")
    //     fs.writeFileSync(filePath, csv, "utf-8")
    //     console.log("✅ CSV exported to:", filePath)
    // }
    //   @Interval(100)
    //     async handleInterval() {
    //         const provider = new ethers.JsonRpcProvider(
    //             "https://testnet-rpc.monad.xyz",
    //             10143,
    //         )
    //         const contract = new ethers.Contract(
    //             "0xa8275fbf5fb47f632862db1cc4a6fbb5bd725856", // địa chỉ đã cho
    //             erc1155Abi,
    //             provider,
    //         )
    //         if (!this.users.length) return
    //         const user = this.users[this.currentIndex]
    //         const balance = await contract.balanceOf(user.userAddress, 0)
    //         console.log(`Balance: ${balance}, user: ${user.userAddress}`)
    //         if (balance > 0) {
    //             await this.userModel.updateOne(
    //                 { userAddress: user.userAddress },
    //                 { $set: { nftOwned: "minted" } },
    //             )
    //         } else {
    //             await this.userModel.updateOne(
    //                 { userAddress: user.userAddress },
    //                 { $set: { nftOwned: "not_minted" } },
    //             )
    //         }
    //         this.currentIndex++
    //     }
}
