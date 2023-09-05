import { Module } from '@nestjs/common'
import { SignalManualController } from './signal-manual.controller'
import { SignalCoreModule } from '../core/signal-core.module'

@Module({
    imports: [SignalCoreModule],
    controllers: [SignalManualController]
})
export class SignalManualModule {}
