import { DynamicModule, Module } from "@nestjs/common"
import { ConfigurableModuleClass, OPTIONS_TYPE } from "./magic-eden.module-definition"
import { MagicEdenService } from "./magic-eden.service"
import { HttpModule } from "@nestjs/axios"

@Module({})
export class MagicEdenModule extends ConfigurableModuleClass {
    static register(options: typeof OPTIONS_TYPE): DynamicModule {
        const dynamicModule = super.register(options)
        return {
            ...dynamicModule,
            imports: [HttpModule],
            providers: [...(dynamicModule?.providers || []), MagicEdenService],
            exports: [MagicEdenService],
        }
    }
}