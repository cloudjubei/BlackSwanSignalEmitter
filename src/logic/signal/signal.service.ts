import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { IdentityService } from '../identity/identity.service'
import { SignalCoreService } from './core/signal-core.service'
import { WSSignalService } from '../websockets/signal/ws-signal.service'
import SignalModel from 'src/models/signal/SignalModel.dto'

@Injectable()
export class SignalService implements OnApplicationBootstrap
{
    constructor(
        private readonly identityService: IdentityService,
        private readonly signalCoreService: SignalCoreService,
        private readonly wsSignalService: WSSignalService,
    ){}
    
    hasSetup = false

    onApplicationBootstrap()
    {
        this.setup()
    }

    private async setup()
    {
        if (this.hasSetup) { return }

        console.log(`SignalService setup ${Date.now()}`)

        this.signalCoreService.setupCache(this.identityService.getTokens())

        this.hasSetup = true

        console.log(`SignalService done`)
    }

    @Cron(CronExpression.EVERY_SECOND)
    async update()
    {
        if (!this.hasSetup) { return }

        const tokens = this.identityService.getTokens()
        console.log('SERVING TOKENS: ', tokens)
        for(const tokenPair of tokens){

            //TODO: work out signal
            let action = 0
            const THRESHOLD = 0.1
            const chance = Math.random()
            if (chance < THRESHOLD){
                action = 1
            }else if (chance > 1-THRESHOLD){
                action = -1
            }

            const signalModel = new SignalModel(tokenPair, action, Date.now())
            console.log(signalModel)
            this.signalCoreService.storeInCache(signalModel)

            await this.wsSignalService.sendUpdate(signalModel.tokenPair, signalModel.action)
        }
    }
}
