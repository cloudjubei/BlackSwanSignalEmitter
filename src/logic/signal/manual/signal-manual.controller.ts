import { Controller, Param, Post } from '@nestjs/common'
import { ApiTags } from "@nestjs/swagger"
import { SignalCoreService } from '../core/signal-core.service'
import SignalModel from 'commons/models/signal/SignalModel.dto'

@ApiTags("signal")
@Controller("manual")
export class SignalManualController
{
    constructor(private readonly signalCoreService: SignalCoreService) {}

    @Post('sell/:tokenPair')
    async sell(@Param('tokenPair') tokenPair: string)
    {
        this.signalCoreService.manualSignal = new SignalModel(tokenPair, '1s', Date.now(), -1, 1)
    }

    @Post('buy/:tokenPair')
    async buy(@Param('tokenPair') tokenPair: string)
    {
        this.signalCoreService.manualSignal = new SignalModel(tokenPair, '1s', Date.now(), 1, 1)
    }
}