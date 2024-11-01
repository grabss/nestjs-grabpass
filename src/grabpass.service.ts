import { Inject, Injectable } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GRABPASS } from './grabpass.constants'

import type {
  AuthTokens,
  AccessTokenPayload,
  RefreshTokenPayload,
  AccessTokenData,
  RefreshTokenData,
  PartialGrabpassConfig
} from 'grabpass'

@Injectable()
export class GrabpassService {
  constructor(@Inject(GRABPASS) private readonly grabpass: Grabpass) {}

  createAuthTokens({
    accessTokenData,
    refreshTokenData
  }: {
    accessTokenData: AccessTokenData
    refreshTokenData: RefreshTokenData
  }): AuthTokens {
    return this.grabpass.createAuthTokens({
      accessTokenData,
      refreshTokenData
    })
  }

  verifyAccessToken(
    token: string,
    config?: PartialGrabpassConfig
  ): AccessTokenPayload {
    return this.grabpass.verifyAccessToken(token, config)
  }

  verifyRefreshToken(
    token: string,
    config?: PartialGrabpassConfig
  ): RefreshTokenPayload {
    return this.grabpass.verifyRefreshToken(token, config)
  }
}
