import { Module } from '@nestjs/common'
import { WSSignalModule } from '../websockets/signal/ws-signal.module'
import { IdentityModule } from '../identity/identity.module'
import { SignalCoreModule } from './core/signal-core.module'
import { SignalService } from './signal.service'

@Module({
    imports: [
        IdentityModule,
        SignalCoreModule,

        WSSignalModule
    ],
    providers: [SignalService],
    exports: [SignalService],
})
export class SignalModule {}