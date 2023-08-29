import { Module } from '@nestjs/common'
import { WSCommonModule } from '../common/ws-common.module'
import { WSSignalService } from './ws-signal.service'
import { WSSignalGateway } from './ws-signal.gateway'
import { SignalCoreModule } from 'src/logic/signal/core/signal-core.module'

@Module({
    imports: [
        WSCommonModule, 
        SignalCoreModule
    ],
    providers: [
        WSSignalGateway, 
        WSSignalService
    ],
    exports: [WSSignalService]
})
export class WSSignalModule {}