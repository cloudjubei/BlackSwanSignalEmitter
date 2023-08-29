import { Controller, Get, Param, Req, UseGuards, Post, Body, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from "@nestjs/swagger"
import { SignalCoreService } from './signal-core.service'
import SignalModel from 'src/models/signal/SignalModel.dto'

@ApiTags("signal")
@Controller("signal")
export class SignalCoreController
{
    constructor(private readonly signalCoreService: SignalCoreService) {}

    @Get('latest/:tokenPair')
    async getLatest(@Param('tokenPair') tokenPair: string) : Promise<SignalModel>
    {
        return await this.signalCoreService.getLatest(tokenPair)
    }

    @Get('latestPrice/:tokenPair')
    async getLatestAction(@Param('tokenPair') tokenPair: string) : Promise<number>
    {
        return await this.signalCoreService.getLatestAction(tokenPair)
    }

    @Get('latestTime/:tokenPair')
    async getLatestTime(@Param('tokenPair') tokenPair: string) : Promise<number>
    {
        return await this.signalCoreService.getLatestTime(tokenPair)
    }
}