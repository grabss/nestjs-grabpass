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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabpassService = void 0;
const common_1 = require("@nestjs/common");
const grabpass_1 = require("grabpass");
const grabpass_constants_1 = require("./grabpass.constants");
let GrabpassService = class GrabpassService {
    constructor(grabpass) {
        this.grabpass = grabpass;
    }
    createAuthTokens({ accessTokenData, refreshTokenData }) {
        return this.grabpass.createAuthTokens({
            accessTokenData,
            refreshTokenData
        });
    }
    verifyAccessToken(token, config) {
        return this.grabpass.verifyAccessToken(token, config);
    }
    verifyRefreshToken(token, config) {
        return this.grabpass.verifyRefreshToken(token, config);
    }
};
exports.GrabpassService = GrabpassService;
exports.GrabpassService = GrabpassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(grabpass_constants_1.GRABPASS)),
    __metadata("design:paramtypes", [grabpass_1.Grabpass])
], GrabpassService);
//# sourceMappingURL=grabpass.service.js.map