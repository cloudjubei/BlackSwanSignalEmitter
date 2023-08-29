import { Injectable } from '@nestjs/common'
import { WebsocketsService } from '../common/ws-common.service'

@Injectable()
export class WSSignalService
{
    constructor(private readonly websocketsService: WebsocketsService){}

    async sendUpdate(tokenPair: string, action: number)
    {
        console.log(`WS ACTION of ${tokenPair} : ${action}`)
        this.websocketsService.sendMessage(tokenPair, action)
    }
}