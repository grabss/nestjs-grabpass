import { Grabpass } from 'grabpass';
import type { AuthTokens, GrabpassConfig, AccessTokenPayload, RefreshTokenPayload } from 'grabpass';
export declare class GrabpassService {
    private readonly grabpass;
    constructor(grabpass: Grabpass);
    createAuthTokens({ accessTokenPayload, refreshTokenPayload, config }: {
        accessTokenPayload: AccessTokenPayload;
        refreshTokenPayload: RefreshTokenPayload;
        config?: Partial<GrabpassConfig>;
    }): AuthTokens;
    verifyAccessToken(token: string): AccessTokenPayload;
    verifyRefreshToken(token: string): RefreshTokenPayload;
}
