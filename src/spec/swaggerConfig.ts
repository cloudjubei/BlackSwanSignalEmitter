import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger'


export default function swaggerConfig() //(tag: string)
{
    const d = new DocumentBuilder()
    .setTitle('SignalEmitter')
    .setVersion('0.0.1')
    .addServer("/")
    .build()

    return d
}

export const swaggerOptions : SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => controllerKey.replace("Controller", "") + methodKey[0].toUpperCase() + methodKey.substring(1, methodKey.length)
}
