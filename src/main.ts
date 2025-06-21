import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder } from "@nestjs/swagger/dist/document-builder"
import { SwaggerModule } from "@nestjs/swagger"

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
        .setTitle("Cats example")
        .setDescription("The cats API description")
        .setVersion("1.0")
        .addTag("cats")
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, documentFactory)
    await app.listen(3000)
}
bootstrap()
