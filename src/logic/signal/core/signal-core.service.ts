import { Injectable } from '@nestjs/common'
import SignalModel from 'src/models/signal/SignalModel.dto'

@Injectable()
export class SignalCoreService
{
    private cache : { [key:string] : SignalModel } = {}

    setupCache(tokens: string[])
    {
        for(const token of tokens){
            this.cache[token] = new SignalModel(token, 0, 0)
        }
    }

    storeInCache(tokenPriceTime: SignalModel)
    {
        this.cache[tokenPriceTime.tokenPair] = tokenPriceTime
    }

    getLatest(tokenPair: string) : SignalModel | undefined
    {
        return this.cache[tokenPair]
    }

    getLatestAction(tokenPair: string) : number | undefined
    {
        return this.getLatest(tokenPair)?.action
    }

    getLatestTime(tokenPair: string) : number | undefined
    {
        return this.getLatest(tokenPair)?.timestamp
    }
}
