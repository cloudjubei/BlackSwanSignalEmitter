import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { IdentityService } from '../identity/identity.service'
import { SignalCoreService } from './core/signal-core.service'
import { WSSignalService } from '../websockets/signal/ws-signal.service'
import SignalModel from 'src/models/signal/SignalModel.dto'
import { getFile } from 'src/lib/storageUtils'
import ConfigModel from 'src/models/ConfigModel.dto'

@Injectable()
export class SignalService implements OnApplicationBootstrap
{
    constructor(
        private readonly identityService: IdentityService,
        private readonly signalCoreService: SignalCoreService,
        private readonly wsSignalService: WSSignalService,
    ){

        const configFile = getFile('config.json')
        const config = JSON.parse(configFile) as ConfigModel
        
        this.chance = config.chance
    }
    
    hasSetup = false
    chance = 0.0

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
        for(const tokenPair of tokens){

            if (this.signalCoreService.manualSignal?.tokenPair === tokenPair) {
                const signalModel = this.signalCoreService.manualSignal!
                this.signalCoreService.storeInCache(signalModel)
                await this.wsSignalService.sendUpdate(signalModel.tokenPair, signalModel.action)
                this.signalCoreService.manualSignal = undefined
                return
            }
            let action = 0
            const chance = Math.random()
            if (chance < this.chance){
                action = 1
            }else if (chance > 1-this.chance){
                action = -1
            }

            const signalModel = new SignalModel(tokenPair, action, Date.now())
            this.signalCoreService.storeInCache(signalModel)

            await this.wsSignalService.sendUpdate(signalModel.tokenPair, signalModel.action)
        }
    }
}
