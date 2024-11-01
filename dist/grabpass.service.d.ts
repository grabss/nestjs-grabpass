import { Grabpass } from 'grabpass';
import type { AuthTokens, AccessTokenPayload, RefreshTokenPayload, AccessTokenData, RefreshTokenData, PartialGrabpassConfig } from 'grabpass';
export declare class GrabpassService {
    private readonly grabpass;
    constructor(grabpass: Grabpass);
    createAuthTokens({ accessTokenData, refreshTokenData }: {
        accessTokenData: AccessTokenData;
        refreshTokenData: RefreshTokenData;
    }): AuthTokens;
    verifyAccessToken(token: string, config?: PartialGrabpassConfig): AccessTokenPayload;
    verifyRefreshToken(token: string, config?: PartialGrabpassConfig): RefreshTokenPayload;
}
