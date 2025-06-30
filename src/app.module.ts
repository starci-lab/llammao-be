import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MagicEdenModule } from "./magic-eden/magic-eden.module"
import { HttpModule } from "@nestjs/axios"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env"]
        }),
        HttpModule.register({
            global: true
        }),
        MagicEdenModule.register({
            isGlobal: true
        }),
        // MongooseModule.forRoot(
        //     process.env.MONGO_URI || "mongodb+srv://starci:Cuong123_A@cluster0.wfyt0ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        // ),
        // MongooseModule.forFeature([
        //     { name: NFTSchema.name, schema: NFTSchemaClass },
        //     { name: UserSchema.name, schema: UserSchemaClass }
        // ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
