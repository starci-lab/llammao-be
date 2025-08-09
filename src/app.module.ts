import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MagicEdenModule } from "./magic-eden/magic-eden.module"
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config"
import { CacheModule } from "@nestjs/cache-manager"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema, UserSchemaClass } from "./mongoose"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./jwt.strategy"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env"],
        }),
        HttpModule.register({
            global: true,
        }),
        MagicEdenModule.register({
            isGlobal: true,
        }),
        CacheModule.register(),
        MongooseModule.forRoot(
            process.env.MONGO_URI ||
        "mongodb://root:Abcdefghijklmnopqrst@172.17.0.1:27017/llamao?authSource=admin",
        ),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || "cuong123_A",
            signOptions: { expiresIn: "1d" },
        }),
        PassportModule,
        MongooseModule.forFeature([
            {
                name: UserSchema.name,
                schema: UserSchemaClass,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule {}
