import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

export class UpdateFollowXResponseDto {
    @ApiProperty({ example: true })
    @IsBoolean()
        success: boolean
}   

export class UpdateJoinDiscordResponseDto {
    @ApiProperty({ example: true })
    @IsBoolean()
        success: boolean
}

export class UpdateLikeXResponseDto {
    @ApiProperty({ example: true })
    @IsBoolean()
        success: boolean
}

export class UpdateCommentXResponseDto {
    @ApiProperty({ example: true })
    @IsBoolean()
        success: boolean
}
