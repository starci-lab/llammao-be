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
                "Origin": "https://magiceden.io",
                "Referer": "https://magiceden.io",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // mimic browser
            },
            body: JSON.stringify(request),
            //credentials: "include", // if needed for cookies
        })
        console.log(res)
        return res.json()
    }
}
