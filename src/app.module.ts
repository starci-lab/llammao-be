import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MagicEdenModule } from "./magic-eden/magic-eden.module"
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config"
import { CacheModule } from "@nestjs/cache-manager"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema, UserSchemaClass } from "./mongoose"

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
        "mongodb+srv://starci:Cuong123_A@cluster0.wfyt0ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ),
        MongooseModule.forFeature([
            {
                name: UserSchema.name,
                schema: UserSchemaClass
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
