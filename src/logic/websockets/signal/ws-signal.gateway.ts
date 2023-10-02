import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody
  } from '@nestjs/websockets'
import { COMMON_GATEWAY } from '../websockets.gateway'
import SignalModel from 'src/models/signal/SignalModel.dto'
import { SignalCoreService } from 'src/logic/signal/core/signal-core.service'
  
export const SIGNAL_PREFIX ='signal_'
export const MESSAGE_GET_LATEST = SIGNAL_PREFIX + 'latest'

@WebSocketGateway(COMMON_GATEWAY)
export class WSSignalGateway
{
    constructor(
        private readonly signalCoreService: SignalCoreService
    ) {}

    @SubscribeMessage(MESSAGE_GET_LATEST)
    async getLatest(@MessageBody() tokenPair: string) : Promise<SignalModel | undefined>
    {
        console.log(`MESSAGE_GET_LATEST: ${tokenPair}`)

        return await this.signalCoreService.getLatest(tokenPair)
    }
}