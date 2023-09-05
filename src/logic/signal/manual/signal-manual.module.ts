import { Module } from '@nestjs/common'
import { SignalManualController } from './signal-manual.controller'
import { WSSignalModule } from 'src/logic/websockets/signal/ws-signal.module'

@Module({
    imports: [WSSignalModule],
    controllers: [SignalManualController]
})
export class SignalManualModule {}
