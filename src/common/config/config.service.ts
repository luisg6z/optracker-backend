import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

    private readonly jwtSecret : string | undefined
    private readonly jwtExpiration : number | undefined

    constructor(){
        this.jwtSecret = process.env.JWT_SECRET
        this.jwtExpiration = Number(process.env.JWT_EXPIRES_IN)
    }

    getJwtSecret() : string{
        return this.jwtSecret
    }

    getJwtExpiration() : Number{
        return this.jwtExpiration
    }
}
