import { Controller, Get } from '@nestjs/common'
import { ApiTags } from "@nestjs/swagger"
import { IdentityService } from './identity.service'
import ConfigModel from 'models/ConfigModel.dto'

@ApiTags("identity")
@Controller("identity")
export class IdentityController
{
    constructor(private readonly identityService: IdentityService) {}

    @Get('config')
    async getConfig() : Promise<ConfigModel>
    {
        return await this.identityService.getConfig()
    }
    
    @Get('type')
    async getType() : Promise<string>
    {
        return await this.identityService.getType()
    }
    
    @Get('identifier')
    async getIdentifier() : Promise<string>
    {
        return await this.identityService.getIdentifier()
    }

    @Get('tokens')
    async getTokens() : Promise<string[]>
    {
        return await this.identityService.getTokens()
    }
}