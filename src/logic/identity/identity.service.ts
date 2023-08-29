import { Injectable } from '@nestjs/common'
import { getFile } from 'src/lib/storageUtils'
import ConfigModel from 'src/models/ConfigModel.dto'

@Injectable()
export class IdentityService
{
    config : ConfigModel

    constructor()
    {
        const configFile = getFile('config.json')
        this.config = JSON.parse(configFile) as ConfigModel
    }

    getConfig() : ConfigModel
    {
        return this.config
    }

    getType() : string
    {
        return this.config.type
    }

    getIdentifier() : string
    {
        return this.config.identifier
    }

    getTokens() : string[]
    {
        return this.config.tokens
    }
}
