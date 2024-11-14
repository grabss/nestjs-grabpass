"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabpassGraphqlAuthInterceptor = exports.GrabpassGraphqlAuthGuard = exports.AuthContext = void 0;
exports.Auth = Auth;
exports.UseAuthContext = UseAuthContext;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const grabpass_service_1 = require("../grabpass.service");
const GRABPASS_AUTH_CONTEXT = 'GRABPASS_AUTH_CONTEXT';
exports.AuthContext = (0, common_1.createParamDecorator)((_, context) => {
    const req = graphql_1.GqlExecutionContext.create(context).getContext().req;
    return req[GRABPASS_AUTH_CONTEXT];
});
function Auth() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(GrabpassGraphqlAuthGuard));
}
let GrabpassGraphqlAuthGuard = class GrabpassGraphqlAuthGuard {
    constructor(grabpass) {
        this.grabpass = grabpass;
    }
    canActivate(context) {
        const req = graphql_1.GqlExecutionContext.create(context).getContext().req;
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = authorization.replace('Bearer ', '');
        try {
            req[GRABPASS_AUTH_CONTEXT] = (({ id }) => {
                return {
                    id
                };
            })(this.grabpass.verifyAccessToken(accessToken));
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.GrabpassGraphqlAuthGuard = GrabpassGraphqlAuthGuard;
exports.GrabpassGraphqlAuthGuard = GrabpassGraphqlAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [grabpass_service_1.GrabpassService])
], GrabpassGraphqlAuthGuard);
function UseAuthContext() {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(GrabpassGraphqlAuthInterceptor));
}
let GrabpassGraphqlAuthInterceptor = class GrabpassGraphqlAuthInterceptor {
    constructor(grabpass) {
        this.grabpass = grabpass;
    }
    intercept(context, next) {
        const req = graphql_1.GqlExecutionContext.create(context).getContext().req;
        const authorization = req.headers.authorization;
        if (authorization && authorization.startsWith('Bearer ')) {
            const accessToken = authorization.replace('Bearer ', '');
            try {
                req[GRABPASS_AUTH_CONTEXT] = (({ id }) => {
                    return {
                        id
                    };
                })(this.grabpass.verifyAccessToken(accessToken));
            }
            catch { }
        }
        return next.handle();
    }
};
exports.GrabpassGraphqlAuthInterceptor = GrabpassGraphqlAuthInterceptor;
exports.GrabpassGraphqlAuthInterceptor = GrabpassGraphqlAuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [grabpass_service_1.GrabpassService])
], GrabpassGraphqlAuthInterceptor);
//# sourceMappingURL=auth-decorators.js.map