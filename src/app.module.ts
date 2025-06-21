import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MagicEdenModule } from "./magic-eden/magic-eden.module"
import { HttpModule } from "@nestjs/axios"

@Module({
    imports: [
        HttpModule.register({
            global: true
        }),
        MagicEdenModule.register({
            isGlobal: true
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
