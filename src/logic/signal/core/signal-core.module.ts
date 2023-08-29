import { Module } from '@nestjs/common'
import { SignalCoreService } from './signal-core.service'
import { SignalCoreController } from './signal-core.controller'

@Module({
    controllers: [SignalCoreController],
    providers: [SignalCoreService],
    exports: [SignalCoreService],
})
export class SignalCoreModule {}
