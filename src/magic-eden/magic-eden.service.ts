import { Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import {
    CreateTokenRequest,
    CreateTokenResponse,
} from "./types"
@Injectable()
export class MagicEdenService {
    constructor(private readonly httpService: HttpService) {}
    async createToken(request: CreateTokenRequest): Promise<CreateTokenResponse> {
        const res = await fetch("https://api-mainnet.magiceden.io/v4/self_serve/nft/create_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
            //credentials: "include", // if needed for cookies
        })
        console.log(res)
        return res.json()
    }
}
