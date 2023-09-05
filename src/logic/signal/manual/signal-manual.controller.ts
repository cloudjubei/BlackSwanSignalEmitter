import { Controller, Param, Post } from '@nestjs/common'
import { ApiTags } from "@nestjs/swagger"
import { WSSignalService } from 'src/logic/websockets/signal/ws-signal.service'

@ApiTags("signal")
@Controller("manual")
export class SignalManualController
{
    constructor(private readonly wSSignalService: WSSignalService) {}

    @Post('sell/:tokenPair')
    async sell(@Param('tokenPair') tokenPair: string)
    {
        await this.wSSignalService.sendUpdate(tokenPair, -1)
    }

    @Post('buy/:tokenPair')
    async buy(@Param('tokenPair') tokenPair: string)
    {
        await this.wSSignalService.sendUpdate(tokenPair, 1)
    }
}