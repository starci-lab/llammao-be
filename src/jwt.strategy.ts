import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { createParamDecorator, ExecutionContext, Injectable } from "@nestjs/common"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "cuong123_A",
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validate(payload: any) {
        return payload
    }
}

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})

import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}