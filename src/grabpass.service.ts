import { Inject, Injectable } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GRABPASS } from './grabpass.constants'

import type {
  AuthTokens,
  GrabpassConfig,
  AccessTokenPayload,
  RefreshTokenPayload
} from 'grabpass'

@Injectable()
export class GrabpassService {
  constructor(@Inject(GRABPASS) private readonly grabpass: Grabpass) {}

  createAuthTokens({
    accessTokenPayload,
    refreshTokenPayload,
    config
  }: {
    accessTokenPayload: AccessTokenPayload
    refreshTokenPayload: RefreshTokenPayload
    config?: Partial<GrabpassConfig>
  }): AuthTokens {
    return this.grabpass.createAuthTokens({
      accessTokenPayload,
      refreshTokenPayload,
      config
    })
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.grabpass.verifyAccessToken(token)
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.grabpass.verifyRefreshToken(token)
  }
}
