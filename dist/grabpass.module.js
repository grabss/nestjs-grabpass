"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GrabpassModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabpassModule = void 0;
const common_1 = require("@nestjs/common");
const grabpass_1 = require("grabpass");
const grabpass_constants_1 = require("./grabpass.constants");
const grabpass_service_1 = require("./grabpass.service");
let GrabpassModule = GrabpassModule_1 = class GrabpassModule {
    static forRoot(options) {
        const grabpassModuleOptionsProvider = {
            provide: grabpass_constants_1.GRABPASS_MODULE_OPTIONS,
            useValue: options
        };
        const grabpassProvider = {
            provide: grabpass_constants_1.GRABPASS,
            useFactory: (options) => {
                return new grabpass_1.Grabpass({
                    config: options.config
                });
            },
            inject: [grabpass_constants_1.GRABPASS_MODULE_OPTIONS]
        };
        return {
            module: GrabpassModule_1,
            providers: [grabpassModuleOptionsProvider, grabpassProvider]
        };
    }
};
exports.GrabpassModule = GrabpassModule;
exports.GrabpassModule = GrabpassModule = GrabpassModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [grabpass_service_1.GrabpassService],
        exports: [grabpass_service_1.GrabpassService]
    })
], GrabpassModule);
//# sourceMappingURL=grabpass.module.js.map